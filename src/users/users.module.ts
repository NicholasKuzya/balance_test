import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entity/user.entity';
import { PaymentHistory } from '../payment-history/entity/payment-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PaymentHistory])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
