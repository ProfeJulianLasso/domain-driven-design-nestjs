import { v4 as uuid } from 'uuid';
import {
  ErrorHandlerForValueObjectsBase,
  ObjectValueException,
} from '../../../../libs/sofka';
import {
  AggregateRootObjectValue,
  ContextObjectValue,
  DateTimeObjectValue,
  EventNameObjectValue,
  IdObjectValue,
  PayloadObjectValue,
} from '../objects-value';
import { IEventDomainEntity } from './interfaces';

export abstract class EventDomainEntityBase
  extends ErrorHandlerForValueObjectsBase
  implements IEventDomainEntity
{
  eventId: string | IdObjectValue;
  aggregateRoot: string | AggregateRootObjectValue;
  context: string | ContextObjectValue;
  eventName: string | EventNameObjectValue;
  payload?: string | PayloadObjectValue;
  dateTime: number | DateTimeObjectValue;
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

    this.eventId = new IdObjectValue();
    if (typeof eventId === 'string') this.eventId.value = eventId;
    else if (eventId instanceof IdObjectValue) this.eventId = eventId;
    else this.eventId.value = uuid();

    this.aggregateRoot = new AggregateRootObjectValue();
    if (typeof aggregateRoot === 'string')
      this.aggregateRoot.value = aggregateRoot;
    else if (aggregateRoot instanceof AggregateRootObjectValue)
      this.aggregateRoot = aggregateRoot;

    this.context = new ContextObjectValue();
    if (typeof context === 'string') this.context.value = context;
    else if (context instanceof ContextObjectValue) this.context = context;

    this.eventName = new EventNameObjectValue();
    if (typeof eventName === 'string') this.eventName.value = eventName;
    else if (eventName instanceof EventNameObjectValue)
      this.eventName = eventName;

    this.payload = new PayloadObjectValue();
    if (payload && typeof payload === 'string') this.payload.value = payload;
    else if (payload && payload instanceof PayloadObjectValue)
      this.payload = payload;

    this.dateTime = new DateTimeObjectValue();
    if (typeof dateTime === 'number') this.dateTime.value = dateTime;
    else if (dateTime instanceof DateTimeObjectValue) this.dateTime = dateTime;

    this.createdAt = Date.now();
  }

  validateData(): void {
    if (this.eventId instanceof IdObjectValue && this.eventId.hasErrors())
      this.setErrors(this.eventId.getErrors());

    if (
      this.aggregateRoot instanceof AggregateRootObjectValue &&
      this.aggregateRoot.hasErrors()
    )
      this.setErrors(this.aggregateRoot.getErrors());

    if (this.context instanceof ContextObjectValue && this.context.hasErrors())
      this.setErrors(this.context.getErrors());

    if (
      this.eventName instanceof EventNameObjectValue &&
      this.eventName.hasErrors()
    )
      this.setErrors(this.eventName.getErrors());

    if (this.payload instanceof PayloadObjectValue && this.payload.hasErrors())
      this.setErrors(this.payload.getErrors());

    if (
      this.dateTime instanceof DateTimeObjectValue &&
      this.dateTime.hasErrors()
    )
      this.setErrors(this.dateTime.getErrors());

    if (this.hasErrors() === true)
      throw new ObjectValueException(
        'Hay algunos errores en la entidad Event',
        this.getErrors(),
      );
  }
}
