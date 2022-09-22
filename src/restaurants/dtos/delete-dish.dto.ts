import { CoreOutput } from 'src/common/dtos/output.dto';
import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { Dish } from '../entities/dish.entity';

@InputType()
export class DeleteDishInput {
    @Field(type => Int)
    dishId:number;
}

@ObjectType()
export class DeleteDishOutput extends CoreOutput {}
