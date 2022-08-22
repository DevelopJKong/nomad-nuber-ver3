import { Category } from './category.entity';
import { CoreEntity } from 'src/common/entities/core.entity';
import { InputType } from '@nestjs/graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  coverImage: string;

  @Field((type) => String, { defaultValue: '부산' })
  @Column()
  @IsString()
  address: string;

  @ManyToOne((type) => Category, (category) => category.restaurants)
  @Field(type => Category)
  category: Category;
}
