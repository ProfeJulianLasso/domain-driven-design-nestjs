import { EventDomainEntity } from '../../../domain';

export interface IGetHistoryResponse<E extends EventDomainEntity> {
  page?: number;
  length: number;
  dateTimeInit?: Date | number;
  dateTimeEnd?: Date | number;
  data: Array<E>;
}
