import { IUseCase } from '../../../../../libs/sofka';
import {
  AggregateRootObjectValue,
  ContextObjectValue,
  DateTimeObjectValue,
  EventAggregate,
  EventDomainEntity,
  EventNameObjectValue,
  IAddLogPayload,
  IAddLogResponse,
  IEventDomainEntity,
  IEventDomainService,
  PayloadObjectValue,
} from '../../../domain';

export class RegisterLogUseCase<
  E1 extends EventDomainEntity,
  S1 extends IEventDomainService<E1>,
  P1 extends IAddLogPayload,
  R1 extends IAddLogResponse<E1>,
  A1 extends EventAggregate<E1, S1>,
> implements IUseCase<P1, R1>
{
  constructor(
    private readonly eventAggregateRoot: A1,
    private readonly eventEntity: { new (args: IEventDomainEntity): E1 },
  ) {}

  async execute(payload: P1): Promise<R1> {
    const entity = this.executeValidations(payload);
    const data = await this.eventAggregateRoot.addLog(entity);
    const result = { success: true, data } as R1;
    return result;
  }

  executeValidations(payload: P1): E1 {
    const entity = new this.eventEntity({
      aggregateRoot: new AggregateRootObjectValue(payload.aggregateRoot),
      context: new ContextObjectValue(payload.context),
      eventName: new EventNameObjectValue(payload.eventName),
      payload: new PayloadObjectValue(payload.payload),
      dateTime: new DateTimeObjectValue(payload.dateTime),
    });
    entity.validateData();
    return entity;
  }
}
