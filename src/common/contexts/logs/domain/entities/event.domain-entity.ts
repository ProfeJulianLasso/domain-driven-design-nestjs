import { v4 as uuid } from 'uuid';
import {
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../libs/sofka';
import {
  AggregateRootValueObject,
  ContextValueObject,
  DateTimeValueObject,
  EventNameValueObject,
  EventIdValueObject,
  PayloadValueObject,
} from '../value-objects';
import { IEventDomainEntity } from '.';

export class EventDomainEntityBase
  extends ValueObjectErrorHandler
  implements IEventDomainEntity
{
  eventId: string | EventIdValueObject;
  aggregateRoot: string | AggregateRootValueObject;
  context: string | ContextValueObject;
  eventName: string | EventNameValueObject;
  payload?: string | PayloadValueObject;
  dateTime: number | DateTimeValueObject;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;

  constructor({
    eventId,
    aggregateRoot,
    context,
    eventName,
    payload,
    dateTime,
  }: IEventDomainEntity) {
    super();

    this.eventId = new EventIdValueObject();
    if (typeof eventId === 'string') this.eventId.value = eventId;
    else if (eventId instanceof EventIdValueObject) this.eventId = eventId;
    else this.eventId.value = uuid();

    this.aggregateRoot = new AggregateRootValueObject();
    if (typeof aggregateRoot === 'string')
      this.aggregateRoot.value = aggregateRoot;
    else if (aggregateRoot instanceof AggregateRootValueObject)
      this.aggregateRoot = aggregateRoot;

    this.context = new ContextValueObject();
    if (typeof context === 'string') this.context.value = context;
    else if (context instanceof ContextValueObject) this.context = context;

    this.eventName = new EventNameValueObject();
    if (typeof eventName === 'string') this.eventName.value = eventName;
    else if (eventName instanceof EventNameValueObject)
      this.eventName = eventName;

    this.payload = new PayloadValueObject();
    if (payload && typeof payload === 'string') this.payload.value = payload;
    else if (payload && payload instanceof PayloadValueObject)
      this.payload = payload;

    this.dateTime = new DateTimeValueObject();
    if (typeof dateTime === 'number') this.dateTime.value = dateTime;
    else if (dateTime instanceof DateTimeValueObject) this.dateTime = dateTime;

    this.createdAt = Date.now();
  }

  validateData(): this {
    if (this.eventId instanceof EventIdValueObject && this.eventId.hasErrors())
      this.setErrors(this.eventId.getErrors());

    if (
      this.aggregateRoot instanceof AggregateRootValueObject &&
      this.aggregateRoot.hasErrors()
    )
      this.setErrors(this.aggregateRoot.getErrors());

    if (this.context instanceof ContextValueObject && this.context.hasErrors())
      this.setErrors(this.context.getErrors());

    if (
      this.eventName instanceof EventNameValueObject &&
      this.eventName.hasErrors()
    )
      this.setErrors(this.eventName.getErrors());

    if (this.payload instanceof PayloadValueObject && this.payload.hasErrors())
      this.setErrors(this.payload.getErrors());

    if (
      this.dateTime instanceof DateTimeValueObject &&
      this.dateTime.hasErrors()
    )
      this.setErrors(this.dateTime.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en la entidad Event',
        this.getErrors(),
      );

    return this;
  }
}
