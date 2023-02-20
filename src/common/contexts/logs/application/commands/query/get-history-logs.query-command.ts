import { LogQueryCommand } from '.';
import { CommandBase, ICommand } from '../../../../../libs/sofka';
import {
  EventAggregate,
  EventDomainEntity,
  IEventDomainService,
  IGetHistoryPayload,
  IGetHistoryResponse,
} from '../../../domain';
import { GetHistoryLogsUseCase } from '../../use-cases';

export class GetHistoryQueryCommand<
  E1 extends EventDomainEntity,
  S1 extends IEventDomainService<E1>,
  P1 extends IGetHistoryPayload,
  R1 extends IGetHistoryResponse<E1>,
  A1 extends EventAggregate<E1, S1>,
> extends CommandBase {
  constructor(private readonly eventAggregateRoot: A1) {
    super();
  }

  getCommand(): ICommand {
    return {
      name: LogQueryCommand.GetHistoryLogs,
      command: GetHistoryLogsUseCase<E1, S1, P1, R1, A1>,
      commandDependencies: [this.eventAggregateRoot],
    };
  }
}
