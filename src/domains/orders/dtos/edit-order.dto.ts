import { CoreOutput } from '../../../common/dtos/output.dto';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Order } from '../entity/order.entity';

@InputType()
export class EditOrderInput extends PickType(Order, ['id', 'status']) {}

@ObjectType()
export class EditOrderOutput extends CoreOutput {}
