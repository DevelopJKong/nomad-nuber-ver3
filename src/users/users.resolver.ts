import { CreateAccountOutput, CreateAccountInput } from './dtos/create-account.dto';
import { UserService } from './users.service';
import { User } from './entities/user.entity';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UserService) {}

  @Query(returns => Boolean)
  hi() {
      return true;
  }

  @Mutation(returns => CreateAccountOutput)
  async createAccount(@Args('input') createAccountInput: CreateAccountInput):Promise<CreateAccountOutput> {
    try {
      const error = await this.usersService.createAccount(createAccountInput);
      if(error) {
        return {
          ok: false,
          error
        }
      }
      return {
        ok:true
      }
    } catch(error) {
      return {
        error,
        ok:false
      }
    }
  }
}
