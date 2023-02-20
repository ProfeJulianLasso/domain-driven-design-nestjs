import { CommandHandlerBase } from '../../../../../libs/sofka';
import {
  EventAggregate,
  EventDomainEntity,
  IAddLogPayload,
  IAddLogResponse,
  IEventDomainEntity,
  IEventDomainService,
  IGetHistoryPayload,
  IGetHistoryResponse,
} from '../../../domain';
import { GetHistoryQueryCommand } from '../query';
import { AddLogWriteCommand } from '../write';

export class EventCommandHandler<
  E1 extends EventDomainEntity,
  S1 extends IEventDomainService<E1>,
  P1 extends IGetHistoryPayload,
  R1 extends IGetHistoryResponse<E1>,
  P2 extends IAddLogPayload,
  R2 extends IAddLogResponse<E1>,
  A1 extends EventAggregate<E1, S1>,
> extends CommandHandlerBase {
  constructor(
    private readonly eventAggregateRoot: A1,
    private readonly eventEntity: { new (payload: IEventDomainEntity): E1 },
  ) {
    super();

    const query1 = new GetHistoryQueryCommand<E1, S1, P1, R1, A1>(
      this.eventAggregateRoot,
    );
    this.registerCommand(query1.getCommand());

    const query2 = new AddLogWriteCommand<E1, S1, P2, R2, A1>(
      this.eventAggregateRoot,
      this.eventEntity,
    );
    this.registerCommand(query2.getCommand());
  }
}
