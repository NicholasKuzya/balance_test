import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PaymentHistoryModule } from './payment-history/payment-history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
      entities: [__dirname + '/../**/*.entity.js']
    }),
    UsersModule,
    PaymentHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
