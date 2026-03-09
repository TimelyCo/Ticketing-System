import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class AssetAllocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  requestId: number;

  @Column()
  assetId: number;

  @Column()
  allocatedBy: number;

  @CreateDateColumn()
  allocationDate: Date;
}
