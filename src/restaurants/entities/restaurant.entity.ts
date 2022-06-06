import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class Restaurant {
    @Field(returns => String)
    name:string;

    @Field(returns => Boolean)
    isVergan?:boolean;

    @Field(returns => String)
    address:string;

    @Field(returns => String)
    ownerName:string;
}