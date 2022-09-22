import { User } from 'src/users/entities/user.entity';
import { CreateAccountOutput } from './../users/dtos/create-account.dto';
import {
  CreateOrderInput,
  CreateOrderOutput,
} from './dtos/create-order.dto';
import { OrderService } from './orders.service';
import { Order } from 'src/orders/entity/order.entity';
import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';

@Resolver((of) => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation((returns) => CreateOrderOutput)
  @Role(["Client"])
  async createOrder(
    @AuthUser() customer: User,
    createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    return {
      ok:true
    }
  }
}
