import { EventDomainEntityBase } from '../../entities';

export interface IGetHistoryResponse {
  page?: number;
  length: number;
  dateTimeInit?: Date | number;
  dateTimeEnd?: Date | number;
  data: Array<EventDomainEntityBase>;
}
