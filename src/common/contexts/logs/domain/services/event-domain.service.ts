import { EventDomainEntityBase } from '../entities';
import {
  DateTimeEndObjectValue,
  DateTimeInitObjectValue,
  LengthObjectValue,
  PageObjectValue,
} from '../objects-value';

export interface IEventDomainService<E extends EventDomainEntityBase> {
  getHistory(
    page?: PageObjectValue,
    length?: LengthObjectValue,
    dateTimeInit?: DateTimeInitObjectValue,
    dateTimeEnd?: DateTimeEndObjectValue,
  ): Promise<Array<E> | null>;
  addLog(log: E): Promise<E | null>;
}
