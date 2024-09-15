import { CoreOutput } from '../../../common/dtos/output.dto';
import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class DeleteDishInput {
  @Field((_type) => Int)
  dishId: number;
}

@ObjectType()
export class DeleteDishOutput extends CoreOutput {}
