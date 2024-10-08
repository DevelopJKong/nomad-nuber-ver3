import { Field, InputType, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { CoreEntity } from '../../../common/entities/core.entity';
import { User } from '../../users/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';

@InputType('PaymentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Payment extends CoreEntity {
  @Field((_type) => String)
  @Column()
  transactionId: string;

  @Field((_type) => User)
  @ManyToOne((_type) => User, (user) => user.payments)
  user: User;

  @RelationId((payment: Payment) => payment.user)
  userId: number;

  @Field((_type) => Restaurant)
  @ManyToOne((_type) => Restaurant)
  restaurant: Restaurant;

  @Field((_type) => Int)
  @RelationId((payment: Payment) => payment.restaurant)
  restaurantId: number;
}
