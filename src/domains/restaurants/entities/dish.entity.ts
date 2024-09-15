import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { CoreEntity } from '../../../common/entities/core.entity';

@InputType('DishChoiceInputType', { isAbstract: true })
@ObjectType()
export class DishChoice {
  @Field((_type) => String)
  name: string;

  @Field((_type) => Int, { nullable: true })
  extra?: number;
}

@InputType('DishOptionInputType', { isAbstract: true })
@ObjectType()
export class DishOption {
  @Field((_type) => String)
  name: string;
  @Field((_type) => [DishChoice], { nullable: true })
  choices?: DishChoice[];
  @Field((_type) => Int, { nullable: true })
  extra?: number;
}

@InputType('DishInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Dish extends CoreEntity {
  @Field((_type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((_type) => Int)
  @Column()
  @IsNumber()
  price: number;

  @Field((_type) => String)
  @Column()
  @IsString()
  photo: string;

  @Field((_type) => String)
  @Column()
  @Length(5, 140)
  description: string;

  @Field((_type) => Restaurant)
  @ManyToOne((_type) => Restaurant, (restaurant) => restaurant.menu, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  restaurant: Restaurant;

  @RelationId((dish: Dish) => dish.restaurant)
  restaurantId: number;

  @Field((_type) => [DishOption], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: DishOption[];
}
