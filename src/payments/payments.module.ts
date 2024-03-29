import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentResolver } from './payments.resolver';
import { Module } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { Payment } from './entities/payment.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Restaurant])],
  providers: [PaymentResolver, PaymentService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
