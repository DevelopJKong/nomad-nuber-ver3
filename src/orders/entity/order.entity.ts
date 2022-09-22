import { Restaurant } from './../../restaurants/entities/restaurant.entity';
import { User } from './../../users/entities/user.entity';
import {
  Field,
  Float,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from './../../common/entities/core.entity';
import { Dish } from 'src/restaurants/entities/dish.entity';

export enum OrderStatus {
  Pending = 'Pending',
  Cooking = 'Cooking',
  PickedUp = 'PickedUp',
  Delivered = 'Delivered',
}

registerEnumType(OrderStatus, { name: 'OrderStatus' });

@InputType('OrderInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Order extends CoreEntity {
  @Field((type) => User, { nullable: false })
  @ManyToOne((type) => User, (user) => user.orders, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  customer?: User;

  @Field((type) => User, { nullable: true })
  @ManyToOne(type => User, user => user.rides)
  driver?: User;

  @Field((type) => Restaurant)
  @ManyToOne(type => Restaurant, restaurant => restaurant.orders)
  restaurant: Restaurant;

  @Field((type) => [Dish])
  dishes: Dish[];

  @Field((type) => Float)
  @Column()
  total: number;

  @Field((type) => OrderStatus)
  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;
}