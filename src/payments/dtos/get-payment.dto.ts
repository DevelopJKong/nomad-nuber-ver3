import { Payment } from 'src/payments/entities/payment.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class GetPaymentsInput {}

@ObjectType()
export class GetPaymentsOutput extends CoreOutput {
  @Field((type) => [Payment], { nullable: true })
  payments?: Payment[];
}
