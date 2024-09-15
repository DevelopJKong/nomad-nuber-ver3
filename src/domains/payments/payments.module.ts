import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentResolver } from './payments.resolver';
import { Module } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { Payment } from './entities/payment.entity';
import { PaymentsController } from './payments.controller';
import { Restaurant } from '../restaurants/entities/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Restaurant])],
  providers: [PaymentResolver, PaymentService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
