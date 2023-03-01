import { IContactInformationDomainEntity, IRoleDomainEntity } from '.';
import {
  UserIdValueObject,
  VerifiedEmailValueObject,
} from '../../value-objects/user';

export interface IUserDomainEntity {
  userId?: string | UserIdValueObject;
  role?: Array<IRoleDomainEntity>;
  contactInformation?: IContactInformationDomainEntity;
  verifiedEmail?: boolean | VerifiedEmailValueObject;
  createdAt?: number | Date;
  updatedAt?: number | Date;
  deletedAt?: number | Date;
}
