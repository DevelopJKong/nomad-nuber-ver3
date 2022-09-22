import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { OrderService } from './orders.service';
import { Order } from './entity/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Order,Restaurant])],
  providers: [
    OrderService,
    OrdersModule
  ]
})
export class OrdersModule {}
