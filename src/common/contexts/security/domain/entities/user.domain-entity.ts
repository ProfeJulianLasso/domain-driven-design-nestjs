import { v4 as uuidv4 } from 'uuid';
import {
  ContactInformationDomainEntityBase,
  IUserDomainEntity,
  RoleDomainEntityBase,
} from '.';
import {
  UserIdValueObject,
  VerifiedEmailValueObject,
} from '../value-objects/user';

export class UserDomainEntityBase implements IUserDomainEntity {
  userId?: string | UserIdValueObject;
  role?: Array<RoleDomainEntityBase>;
  contactInformation?: ContactInformationDomainEntityBase;
  verifiedEmail?: boolean | VerifiedEmailValueObject;
  createdAt?: number | Date;
  updatedAt?: number | Date;
  deletedAt?: number | Date;

  constructor(data?: IUserDomainEntity) {
    if (data?.userId) this.userId = data.userId;
    else this.userId = uuidv4();

    this.role = new Array<RoleDomainEntityBase>();
    if (data?.role && data.role.length > 0)
      data.role.forEach((role) => {
        this.role?.push(role as RoleDomainEntityBase);
      });

    if (data?.contactInformation)
      this.contactInformation =
        data.contactInformation as ContactInformationDomainEntityBase;

    if (data?.verifiedEmail) this.verifiedEmail = data.verifiedEmail;

    this.createdAt = new Date();
  }
}
