import { GetOrdersInput, GetOrdersOutput } from './dtos/get-orders.dto';
import { User } from 'src/users/entities/user.entity';
import { CreateAccountOutput } from './../users/dtos/create-account.dto';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { OrderService } from './orders.service';
import { Order } from 'src/orders/entity/order.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';

@Resolver((of) => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation((returns) => CreateOrderOutput)
  @Role(['Client'])
  async createOrder(
    @AuthUser() customer: User,
    @Args('input') createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    return this.orderService.createOrder(customer, createOrderInput);
  }

  @Query((returns) => GetOrdersOutput)
  @Role(['Any'])
  async getOrders(
    @AuthUser() user: User,
    @Args('input') getOrdersInput: GetOrdersInput,
  ): Promise<GetOrdersOutput> {
    return this.orderService.getOrders(user, getOrdersInput);
  }
}
