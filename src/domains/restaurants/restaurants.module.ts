import { Category } from './entities/category.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CategoryResolver,
  DishResolver,
  RestaurantResolver,
} from './restaurants.resolver';
import { RestaurantService } from './restaurants.service';
import { Dish } from './entities/dish.entity';
import { Restaurant } from './entities/restaurant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant, Dish, Category]),
  ],
  providers: [
    DishResolver,
    RestaurantResolver,
    CategoryResolver,
    RestaurantService,
  ],
})
export class RestaurantsModule {}
