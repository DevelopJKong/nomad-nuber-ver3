import { Order } from './../entity/order.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput extends PickType(Order,['items']){
  @Field((type) => Int)
  restaurantId: number;
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput {}
