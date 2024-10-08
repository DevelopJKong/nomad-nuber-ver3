import { CoreOutput } from '../../../common/dtos/output.dto';
import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { Dish } from '../entities/dish.entity';

@InputType()
export class EditDishInput extends PickType(PartialType(Dish), [
  'name',
  'price',
  'photo',
  'description',
]) {
  @Field((_type) => Int)
  dishId: number;
}

@ObjectType()
export class EditDishOutput extends CoreOutput {}
