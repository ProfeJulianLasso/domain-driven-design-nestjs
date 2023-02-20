import { EventDomainEntity } from '../../../domain';

export interface IAddLogResponse<E extends EventDomainEntity> {
  success: boolean;
  data: E | null;
}
