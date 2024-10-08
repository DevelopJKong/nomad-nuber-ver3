import { UserRole } from '../../domains/users/entities/user.entity';
import { SetMetadata } from '@nestjs/common';

//TODO type 과 interface의 차이점을 정확하게 알아두기

export type AllowedRoles = keyof typeof UserRole | 'Any';

export const Role = (roles: AllowedRoles[]) => SetMetadata('role', roles);
