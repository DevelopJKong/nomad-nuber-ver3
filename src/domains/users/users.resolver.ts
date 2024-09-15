import { Role } from './../auth/role.decorator';
import { VerifyEmailOutput, VerifyEmailInput } from './dtos/verify-email.dto';
import { EditProfileOutput, EditProfileInput } from './dtos/edit-profile.dto';
import { AuthUser } from './../auth/auth-user.decorator';
import { LoginOutput, LoginInput } from './dtos/login.dto';
import {
  CreateAccountOutput,
  CreateAccountInput,
} from './dtos/create-account.dto';
import { UserService } from './users.service';
import { User } from './entities/user.entity';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';

@Resolver((_of: unknown) => User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query((_returns) => Boolean)
  hi() {
    return true;
  }

  @Mutation((_returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.userService.createAccount(createAccountInput);
  }

  @Mutation((_returns) => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }

  @Query((_returns) => User)
  @Role(['Any'])
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @Query((_returns) => UserProfileOutput)
  @Role(['Any'])
  async userProfile(
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    return this.userService.findById(userProfileInput.userId);
  }

  @Mutation((_returns) => EditProfileOutput)
  @Role(['Any'])
  async editProfile(
    @AuthUser() authUser: User,
    @Args('input') editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    return this.userService.editProfile(authUser.id, editProfileInput);
  }

  @Mutation((_returns) => VerifyEmailOutput)
  async verifyEmail(
    @Args('input') { code }: VerifyEmailInput,
  ): Promise<VerifyEmailOutput> {
    return this.userService.verifyEmail(code);
  }
}
