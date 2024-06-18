import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PaymentHistory } from '../../payment-history/entity/payment-history.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', default: 0 })
  balance: number;

  @OneToMany(() => PaymentHistory, (paymentHistory) => paymentHistory.user, { cascade: true })
  paymentHistories: PaymentHistory[];
}
