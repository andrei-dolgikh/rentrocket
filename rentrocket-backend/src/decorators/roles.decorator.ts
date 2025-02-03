
import { SetMetadata } from '@nestjs/common';
import { Roles } from '@prisma/client';

export const ROLES_KEY = 'roles';

export const RolesDecorator = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
export const RoleUser = () => RolesDecorator(Roles.user);
export const RoleAdmin = () => RolesDecorator(Roles.admin);
// export const RoleModerator = () => RolesDecorator(Roles.moderator);
// export const RolePublisher = () => RolesDecorator(Roles.publisher);