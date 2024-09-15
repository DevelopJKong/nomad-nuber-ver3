import { Dish } from './../../restaurants/entities/dish.entity';
import { Field, InputType, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from '../../../common/entities/core.entity';

@InputType('OrderItemOptionInputType', { isAbstract: true })
@ObjectType()
export class OrderItemOption {
  @Field((_type) => String)
  name: string;

  @Field((_type) => String, { nullable: true })
  choice?: string;

  @Field((_type) => Int, { nullable: true })
  extra?: number;
}

@InputType('OrderItemInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class OrderItem extends CoreEntity {
  @Field((_type) => Dish)
  @ManyToOne((_type) => Dish, { nullable: true, onDelete: 'CASCADE' })
  dish: Dish;

  @Field((_type) => [OrderItemOption], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: OrderItemOption[];
}
