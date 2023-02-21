import { EventDomainEntityBase } from '../../../domain';

export interface IAddLogResponse<E extends EventDomainEntityBase> {
  success: boolean;
  data: E | null;
}
