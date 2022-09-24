import { Order } from 'src/orders/entity/order.entity';
import { CoreOutput } from './../../common/dtos/output.dto';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class EditOrderInput extends PickType(Order, ['id', 'status']) {}

@ObjectType()
export class EditOrderOutput extends CoreOutput {}
