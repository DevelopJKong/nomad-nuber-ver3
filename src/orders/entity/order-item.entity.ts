import {
  Dish,
  DishOption,
  DishChoice,
} from './../../restaurants/entities/dish.entity';
import { Field, InputType, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from './../../common/entities/core.entity';

@InputType('OrderItemOptionInpuType', { isAbstract: true })
@ObjectType()
export class OrderItemOption {
  @Field((type) => String)
  name: string;

  @Field((type) => DishChoice, { nullable: true })
  choice?: DishChoice;

  @Field((type) => Int, { nullable: true })
  extra?: number;
}

@InputType('OrderItemInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class OrderItem extends CoreEntity {
  @ManyToOne((type) => Dish, { nullable: true, onDelete: 'CASCADE' })
  dish: Dish;

  @Field((type) => [OrderItemOption], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: OrderItemOption[];
}
