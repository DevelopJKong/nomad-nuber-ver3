import { User } from './../entities/user.entity';
import { CoreOutput } from '../../../common/dtos/output.dto';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class UserProfileInput {
  @Field((type) => Number)
  userId: number;
}

@ObjectType()
export class UserProfileOutput extends CoreOutput {
  @Field((type) => User, { nullable: true })
  user?: User;
}
