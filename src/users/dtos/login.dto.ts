import { User } from './../entities/user.entity';
import { Field, ObjectType, PickType, InputType } from '@nestjs/graphql';
import { MutationOutput } from './../../common/dto/output.dto';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends MutationOutput {
  @Field((type) => String)
  token?: string;
}
