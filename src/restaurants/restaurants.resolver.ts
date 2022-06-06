import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class RestaurantResolver {

  @Query((returns) => [Restaurant])
  restaurants(): Restaurant[] {
    return [];
  }

  @Mutation(returns => Boolean)
  createRestaurant(
    @Args() createRestaurantInput:CreateRestaurantDto
  ):boolean {
      return true;
  }

}
