import { OrderItemOption } from './../entity/order-item.entity';
import { CoreOutput } from '../../../common/dtos/output.dto';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
class CreateOrderItemInput {
  @Field((type) => Int)
  dishId: number;

  @Field((type) => [OrderItemOption], { nullable: true })
  options?: OrderItemOption[];
}

@InputType()
export class CreateOrderInput {
  @Field((type) => Int)
  restaurantId: number;

  @Field((type) => [CreateOrderItemInput])
  items: CreateOrderItemInput[];
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {
  @Field((type) => Int, { nullable: true })
  orderId?: number;
}
