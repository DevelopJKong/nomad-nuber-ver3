import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentResolver } from './payments.resolver';
import { Module } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { Payment } from './entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [PaymentResolver, PaymentService],
})
export class PaymentsModule {}
