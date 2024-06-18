import { Controller, Post, Param, Body, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Crud, CrudController } from '@dataui/crud';
import { User } from './entity/user.entity';

@Crud({
  routes: {only: ['getOneBase', 'createOneBase']},
  model: {
    type: User,
  },
  query: {
    join: {
      paymentHistories: {
        eager: true,
      },
    },
  }
})
@Controller('api/users')
export class UsersController implements CrudController<User>{
  constructor(public service: UsersService) {}

  @Post(':id/debit')
  async debitBalance(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount') amount: number,
  ) {
    if (amount <= 0) {
      throw new BadRequestException('Amount must be greater than zero');
    }
    return this.service.debitUserBalance(id, amount);
  }
}