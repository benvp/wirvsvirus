import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.enum';
import { User } from './user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    if (user instanceof UnauthorizedException)
      throw user;
      
    if (!user) return false;

    return roles.includes(user.role);
  }
}
