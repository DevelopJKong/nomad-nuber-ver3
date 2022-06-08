import { RestaurantService } from './restaurants.service';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query((returns) => [Restaurant])
  async restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }

  @Mutation((returns) => Boolean)
  async createRestaurant(
    @Args() createRestaurantDto: CreateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(createRestaurantDto);
      return true;
      
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
