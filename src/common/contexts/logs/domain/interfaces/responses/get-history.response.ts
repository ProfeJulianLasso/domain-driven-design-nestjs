import { EventDomainEntityBase } from '../../../domain';

export interface IGetHistoryResponse<E extends EventDomainEntityBase> {
  page?: number;
  length: number;
  dateTimeInit?: Date | number;
  dateTimeEnd?: Date | number;
  data: Array<E>;
}
