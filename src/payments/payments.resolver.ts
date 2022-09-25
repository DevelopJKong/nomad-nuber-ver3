import { CreatePaymentOutput } from './dtos/create-payment.dto';
import { Payment } from 'src/payments/entities/payment.entity';
import { Mutation, Resolver } from '@nestjs/graphql';
import { PaymentService } from './payments.service';

@Resolver((of) => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  //@Mutation(returns => CreatePaymentOutput)
}
