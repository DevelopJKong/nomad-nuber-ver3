import { Dish } from './dish.entity';
import { Category } from './category.entity';
import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from '../../../common/entities/core.entity';
import { User } from '../../users/entities/user.entity';
import { Order } from '../../orders/entity/order.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';

@InputType('RestaurantInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Field((_type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((_type) => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field((_type) => String)
  @Column()
  address: string;

  @Field((_type) => Category, { nullable: true })
  @ManyToOne((_type) => Category, (category) => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  category: Category;

  @Field((_type) => User)
  @ManyToOne((_type) => User, (user) => user.restaurants, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @RelationId((restaurant: Restaurant) => restaurant.owner)
  ownerId: number;

  @Field((_type) => [Dish])
  @OneToMany((_type) => Dish, (dish) => dish.restaurant)
  menu: Dish[];

  @Field((_type) => [Order])
  @OneToMany((_type) => Order, (order) => order.restaurant)
  orders: Order[];

  @Field((_type) => Boolean)
  @Column({ default: false })
  isPromoted: boolean;

  @Field((_type) => Date, { nullable: true })
  @Column({ nullable: true })
  promotedUntil: Date;
}
