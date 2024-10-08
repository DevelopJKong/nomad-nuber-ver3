import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../../../common/dtos/output.dto';
import { Payment } from '../entities/payment.entity';

@InputType()
export class GetPaymentsInput {}

@ObjectType()
export class GetPaymentsOutput extends CoreOutput {
  @Field((type) => [Payment], { nullable: true })
  payments?: Payment[];
}
