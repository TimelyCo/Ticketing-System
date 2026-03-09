import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { User } from '../users/entities/user.entity';
import { TicketStatus } from '../common/enums/ticket-status.enum';
import { TicketPriority } from '../common/enums/ticket-priority.enum';
import { Role } from '../common/enums/role.enum';
import { CreateTicketDto } from './dto/create-ticket.entity';

@Injectable()
export class TicketsService {

  constructor(
    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async createTicket(dto: CreateTicketDto, user: { userId: number; role: string }) {
    // Find a free IT agent to auto-assign
    const freeAgent = await this.userRepo.findOne({
      where: {
        role: Role.IT_AGENT,
        isAvailable: true,
      },
    });

    const ticketData: Partial<Ticket> = {
      title: dto.title,
      description: dto.description,
      priority: dto.priority || TicketPriority.MEDIUM,
      assetType: dto.assetType || undefined,
      createdBy: { id: user.userId } as User,
    };

    if (freeAgent) {
      // Auto-assign to available agent
      ticketData.assignedTo = { id: freeAgent.id } as User;
      ticketData.status = TicketStatus.IN_PROGRESS;
      ticketData.slaDeadline = new Date(Date.now() + 4 * 60 * 60 * 1000); // 4 hours SLA
      await this.userRepo.save(freeAgent);
    } else {
      // No agent available — create as OPEN
      ticketData.status = TicketStatus.OPEN;
    }

    const ticket = this.ticketRepo.create(ticketData);
    const savedTicket = await this.ticketRepo.save(ticket);

    // Return with relations loaded
    return this.ticketRepo.findOne({
      where: { id: savedTicket.id },
      relations: ['createdBy', 'assignedTo'],
    });
  }

  async findAll() {
    return this.ticketRepo.find({
      relations: ['createdBy', 'assignedTo'],
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: number) {
    const ticket = await this.ticketRepo.findOne({
      where: { id },
      relations: ['createdBy', 'assignedTo'],
    });
    if (!ticket) throw new NotFoundException('Ticket not found');
    return ticket;
  }

  async findByEmployee(userId: number) {
    return this.ticketRepo.find({
      where: { createdBy: { id: userId } },
      relations: ['createdBy', 'assignedTo'],
      order: { createdAt: 'DESC' },
    });
  }

  // Agent updates ticket status
  async updateStatus(ticketId: number, status: TicketStatus, user: { userId: number; role: string }) {
    const ticket = await this.ticketRepo.findOne({
      where: { id: ticketId },
      relations: ['assignedTo'],
    });

    if (!ticket) throw new NotFoundException('Ticket not found');

    if (!ticket.assignedTo || ticket.assignedTo.id !== user.userId) {
      throw new ForbiddenException('Not authorized to update this ticket');
    }

    if (ticket.status === status) {
      return ticket;
    }

    ticket.status = status;

    if (status === TicketStatus.RESOLVED) {
      ticket.assignedTo.isAvailable = true;
      await this.userRepo.save(ticket.assignedTo);
    }

    return this.ticketRepo.save(ticket);
  }
}