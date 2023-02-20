import {
  AggregateRootObjectValue,
  ContextObjectValue,
  DateTimeObjectValue,
  EventNameObjectValue,
  IdObjectValue,
  PayloadObjectValue,
} from '../../objects-value';

export interface IEventDomainEntity {
  eventId?: string | IdObjectValue;
  aggregateRoot: string | AggregateRootObjectValue;
  context: string | ContextObjectValue;
  eventName: string | EventNameObjectValue;
  payload?: string | PayloadObjectValue;
  dateTime: number | DateTimeObjectValue;
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
}
