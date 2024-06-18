import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentHistory } from './entity/payment-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentHistory])],
})
export class PaymentHistoryModule {}
