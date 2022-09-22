import { OrderService } from './order.service';
import { Order } from './entity/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [
    OrderService,
    OrdersModule
  ]
})
export class OrdersModule {}
