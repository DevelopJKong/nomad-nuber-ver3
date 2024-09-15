import { CoreOutput } from '../../../common/dtos/output.dto';
import { Restaurant } from './../entities/restaurant.entity';
import { InputType, ObjectType, PickType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, [
  'name',
  'coverImg',
  'address',
]) {
  @Field((_type) => String)
  categoryName: string;
}
@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {
  @Field((_type) => Int)
  restaurantId?: number;
}
