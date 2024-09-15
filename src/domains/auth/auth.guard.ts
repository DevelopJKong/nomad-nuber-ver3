import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '../../libs/jwt/jwt.service';
import { UserService } from '../../domains/users/users.service';
import { AllowedRoles } from './role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles>(
      'role',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }

    const gqlContext = GqlExecutionContext.create(context).getContext();
    const token = gqlContext.token;

    if (!token) {
      return false;
    }

    const decoded = this.jwtService.verify(token.toString());

    if (
      typeof decoded !== 'object' ||
      !Object.prototype.hasOwnProperty.call(decoded, 'id')
    ) {
      return false;
    }

    const { user } = await this.userService.findById(decoded['id']);

    if (!user) {
      return false;
    }

    gqlContext['user'] = user;

    if (roles.includes('Any')) {
      return true;
    }

    return roles.includes(user.role);
  }
}
