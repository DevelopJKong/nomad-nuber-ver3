import { CreateRestaurantDto } from './create-restaurant.dto';
import { Restaurant } from './../entities/restaurant.entity';
import { ArgsType, Field, InputType, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateRestaurantInputType extends PartialType(CreateRestaurantDto) {}

@ArgsType()
export class UpdateRestaurantDto {
    @Field(type => Number)
    id:number;
}