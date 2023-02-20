import { EventDomainEntity } from '../entities';
import {
  DateTimeEndObjectValue,
  DateTimeInitObjectValue,
  LengthObjectValue,
  PageObjectValue,
} from '../objects-value';
import { IEventDomainService } from '../services';

export class EventAggregate<
  E extends EventDomainEntity,
  S extends IEventDomainService<E>,
> implements IEventDomainService<E>
{
  constructor(private readonly eventService: S) {}

  async getHistory(
    page?: PageObjectValue,
    length?: LengthObjectValue,
    dateTimeInit?: DateTimeInitObjectValue,
    dateTimeEnd?: DateTimeEndObjectValue,
  ): Promise<E[] | null> {
    return await this.eventService.getHistory(
      page,
      length,
      dateTimeInit,
      dateTimeEnd,
    );
  }

  async addLog(log: E): Promise<E | null> {
    return await this.eventService.addLog(log);
  }
}
