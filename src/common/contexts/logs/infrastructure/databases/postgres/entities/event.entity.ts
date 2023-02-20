import {
  IdObjectValue,
  AggregateRootObjectValue,
} from 'src/common/contexts/logs/domain';
import { Entity } from 'typeorm';
import { EventDomainEntity } from '../../../../domain/entities';

@Entity()
export class EventEntity extends EventDomainEntity {
  eventId: IdObjectValue;
  aggregateRoot: AggregateRootObjectValue;
  context: string;
  eventName: string;
  payload?: string | undefined;
  dateTime: number;
  createdAt: number;
  updatedAt?: number | undefined;
  deletedAt?: number | undefined;
}
