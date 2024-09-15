import { Order } from './../../orders/entity/order.entity';
import { Restaurant } from './../../restaurants/entities/restaurant.entity';
import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import {
  ObjectType,
  InputType,
  Field,
  registerEnumType,
} from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { CoreEntity } from '../../../common/entities/core.entity';
import { Payment } from '../../payments/entities/payment.entity';

export enum UserRole {
  Owner = 'Owner',
  Client = 'Client',
  Delivery = 'Delivery',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field((_type) => String)
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Field((_type) => String)
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field((_type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ default: false })
  @Field((_type) => Boolean)
  @IsBoolean()
  verified: boolean;

  @Field((_type) => [Restaurant])
  @OneToMany((_type) => Restaurant, (restaurant) => restaurant.owner)
  restaurants: Restaurant[];

  @Field((_type) => [Order])
  @OneToMany((_type) => Order, (order) => order.customer)
  orders: Order[];

  @Field((_type) => [Payment])
  @OneToMany((_type) => Payment, (payment) => payment.user)
  payments: Payment[];

  @Field((_type) => [Order])
  @OneToMany((_type) => Order, (order) => order.driver)
  rides: Order[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
