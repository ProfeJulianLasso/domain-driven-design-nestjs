import {
  DescriptionValueObject,
  NameValueObject,
  RoleIdValueObject,
  StateValueObject,
} from '../../value-objects/role';

export interface IRoleDomainEntity {
  roleId?: string | RoleIdValueObject;
  name?: string | NameValueObject;
  description?: string | DescriptionValueObject;
  state?: boolean | StateValueObject;
  createdAt?: number | Date;
  updatedAt?: number | Date;
  deletedAt?: number | Date;
}
