import { CoreEntity } from '../../../common/entities/core.entity';
import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Category extends CoreEntity {
  @Field((_type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((_type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  coverImg: string;

  @Field((_type) => String)
  @Column({ unique: true })
  @IsString()
  slug: string;

  @Field((_type) => [Restaurant])
  @OneToMany((_type) => Restaurant, (restaurant) => restaurant.category)
  restaurants: Restaurant[];
}
