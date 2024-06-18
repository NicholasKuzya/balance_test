import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { PaymentHistory } from '../payment-history/entity/payment-history.entity';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(PaymentHistory)
    private paymentHistoryRepository: Repository<PaymentHistory>,
  ) {
    super(usersRepository);
    this.paymentHistoryRepository = paymentHistoryRepository;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async debitUserBalance(userId: number, amount: number): Promise<User> {
    const user = await this.getUserById(userId);
    
    if (user.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    user.balance -= amount;
    await this.usersRepository.save(user);

    const paymentHistory = new PaymentHistory();
    paymentHistory.userId = userId;
    paymentHistory.amount = -amount;
    paymentHistory.ts = new Date();
    
    await this.paymentHistoryRepository.save(paymentHistory);

    return user;
  }
}