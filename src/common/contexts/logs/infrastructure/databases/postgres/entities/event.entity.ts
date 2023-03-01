import {
  AggregateRootValueObject,
  EventIdValueObject,
} from 'src/common/contexts/logs/domain';
import { EventDomainEntityBase } from '../../../../domain/entities';

export class EventEntity extends EventDomainEntityBase {
  eventId: EventIdValueObject;
  aggregateRoot: AggregateRootValueObject;
  context: string;
  eventName: string;
  payload?: string;
  dateTime: number;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
}
