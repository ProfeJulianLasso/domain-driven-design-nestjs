import {
  EventIdValueObject,
  AggregateRootValueObject,
  ContextValueObject,
  EventNameValueObject,
  PayloadValueObject,
  DateTimeValueObject,
} from '../../value-objects';

export interface IEventDomainEntity {
  eventId?: string | EventIdValueObject;
  aggregateRoot?: string | AggregateRootValueObject;
  context?: string | ContextValueObject;
  eventName?: string | EventNameValueObject;
  payload?: string | PayloadValueObject;
  dateTime?: number | DateTimeValueObject;
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
}
