import {
  AggregateRootObjectValue,
  IdObjectValue,
} from 'src/common/contexts/logs/domain';
import { EventDomainEntityBase } from '../../../../domain/entities';

export class EventEntity extends EventDomainEntityBase {
  eventId: IdObjectValue;
  aggregateRoot: AggregateRootObjectValue;
  context: string;
  eventName: string;
  payload?: string;
  dateTime: number;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
}
