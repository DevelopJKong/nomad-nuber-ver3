import { User } from './../entities/user.entity';
import { Field, ObjectType, PickType, InputType } from '@nestjs/graphql';
import { CoreOutput } from '../../../common/dtos/output.dto';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends CoreOutput {
  @Field((type) => String, { nullable: true })
  token?: string;
}
