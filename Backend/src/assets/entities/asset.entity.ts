import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ unique: true })
  serialNumber: string;

  @Column({ default: 'AVAILABLE' })
  status: string;

  @Column({ default: 1 })
  count: number;
}
