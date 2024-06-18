import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entity/user.entity';

@Entity('payment-history')
export class PaymentHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'float' })
  amount: number;

  @Column()
  ts: Date;

  @ManyToOne(() => User, (user) => user.paymentHistories, { onDelete: 'CASCADE' })
  user: User;
}
