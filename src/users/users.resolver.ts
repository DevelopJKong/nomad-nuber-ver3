import { AuthUser } from './../auth/auth-user.decorator';
import { AuthGuard } from './../auth/auth.guard';
import { LoginOutput, LoginInput } from './dtos/login.dto';
import {
  CreateAccountOutput,
  CreateAccountInput,
} from './dtos/create-account.dto';
import { UserService } from './users.service';
import { User } from './entities/user.entity';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => Boolean)
  hi() {
    return true;
  }

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const { ok, error } = await this.userService.createAccount(
        createAccountInput,
      );
      if (error) {
        return {
          ok: false,
          error,
        };
      }
      return {
        ok: true,
      };
    } catch (error) {
      return {
        error,
        ok: false,
      };
    }
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args('input') loginInput:LoginInput):Promise<LoginOutput> {
    try {
      const { ok, error, token } = await this.userService.login(loginInput);
      return { ok, error, token };
    } catch (error) {}
  }

  @Query(returns => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser:User) {
    return authUser;
  }
}
