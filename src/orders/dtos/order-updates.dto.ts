import { Order } from 'src/orders/entity/order.entity';
import { InputType, PickType } from '@nestjs/graphql';

@InputType()
export class OrderUpdatesInput extends PickType(Order, ['id']) {}
