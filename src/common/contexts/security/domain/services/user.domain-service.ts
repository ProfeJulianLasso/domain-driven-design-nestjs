import { UserDomainEntityBase } from '../entities';

export interface IUserDomainService<
  T extends UserDomainEntityBase = UserDomainEntityBase,
> {
  getUser(userId: string): Promise<T | null>;
  registerUser(entity: T): Promise<T | null>;
  updateUser(userId: string, entity: T): Promise<T>;
  deleteUser(userId: string): Promise<boolean>;
}
