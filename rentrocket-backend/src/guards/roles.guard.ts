
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Roles } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    
      const request = context.switchToHttp().getRequest();
      const user = request.user;
    
      if (!requiredRoles) {
        return true;
      }
    
      return requiredRoles.some((role) => user?.roles?.includes(role));
    }
    

}