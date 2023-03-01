import { UserDomainEntityBase } from '../../entities';

export interface IAddCustomerUserResponse {
  success: boolean;
  data: UserDomainEntityBase | null;
}
