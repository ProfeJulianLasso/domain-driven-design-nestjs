import { EventDomainEntityBase } from '../entities';
import {
  DateTimeEndValueObject,
  DateTimeInitValueObject,
  LengthValueObject,
  PageValueObject,
} from '../value-objects';
import { IEventDomainService } from '../services';

export class EventAggregateRoot implements IEventDomainService {
  constructor(private readonly eventService: IEventDomainService) {}

  async getHistory(
    page?: PageValueObject,
    length?: LengthValueObject,
    dateTimeInit?: DateTimeInitValueObject,
    dateTimeEnd?: DateTimeEndValueObject,
  ): Promise<EventDomainEntityBase[] | null> {
    return await this.eventService.getHistory(
      page,
      length,
      dateTimeInit,
      dateTimeEnd,
    );
  }

  async addLog(
    log: EventDomainEntityBase,
  ): Promise<EventDomainEntityBase | null> {
    return await this.eventService.addLog(log);
  }
}
