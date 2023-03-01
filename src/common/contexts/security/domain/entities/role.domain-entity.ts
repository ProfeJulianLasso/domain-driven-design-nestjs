import { v4 as uuidv4 } from 'uuid';
import {
  DescriptionValueObject,
  NameValueObject,
  RoleIdValueObject,
  StateValueObject,
} from '../value-objects/role';
import { IRoleDomainEntity } from './interfaces';

export class RoleDomainEntityBase implements IRoleDomainEntity {
  roleId?: string | RoleIdValueObject;
  name: string | NameValueObject;
  description: string | DescriptionValueObject;
  state: boolean | StateValueObject;
  createdAt: number | Date;
  updatedAt?: number | Date;
  deletedAt?: number | Date;

  constructor(data?: IRoleDomainEntity) {
    if (data?.roleId) this.roleId = data.roleId;
    else this.roleId = uuidv4();

    if (data?.name) this.name = data.name;

    if (data?.description) this.description = data.description;

    if (data?.state) this.state = data.state;

    this.createdAt = new Date();
  }
}
