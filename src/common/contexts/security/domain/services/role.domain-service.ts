import { RoleDomainEntityBase } from '../entities';

export interface IRoleDomainService<
  T extends RoleDomainEntityBase = RoleDomainEntityBase,
> {
  getUserRoles(userId: string): Promise<T[]>;
  assignRoleToUser(userId: string, roleId: string): Promise<boolean>;
  checkUserRole(userId: string, roleId: string): Promise<boolean>;
}
