import { Dish } from './../restaurants/entities/dish.entity';
import { OrderItem } from './entity/order-item.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { OrderService } from './orders.service';
import { Order } from './entity/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrderResolver } from './orders.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Restaurant, OrderItem, Dish])],
  providers: [OrderService, OrderResolver],
})
export class OrdersModule {}
