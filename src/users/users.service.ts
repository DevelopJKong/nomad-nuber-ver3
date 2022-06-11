import { LoginInput } from './dtos/login.dto';
import { CreateAccountInput } from './dtos/create-account.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ email });
      if (exists) {
        return { ok: false, error: 'There is a user with that email' };
      }
      await this.users.save(this.users.create({ email, password, role }));
      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async login({ email, password }:LoginInput):Promise<{ok:boolean; error?:string; token?:string}> {
    //find the user with the email
    //check if the password is correct
    //make a JWT and give it to the user

    try {
      const user = await this.users.findOne({ email });
      if(!user) {
        return {
          ok:false,
          error: 'User not found'
        }
      }

      const passwordCorrect = await user.checkPassword(password);
      if(!passwordCorrect) {
        return {
          ok:false,
          error:'Wrong password'
        }
      }
      
      return {
        ok:true,
        token:"lalala"
      }


    } catch(error) {
      return {
        ok:false,
        error
      }
    }
  }
}
