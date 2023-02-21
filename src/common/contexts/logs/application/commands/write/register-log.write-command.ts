import { LogWriteCommand } from '.';
import { ICommand } from '../../../../../libs/sofka';
import {
  EventAggregate,
  EventDomainEntityBase,
  IAddLogPayload,
  IAddLogResponse,
  IEventDomainEntity,
  IEventDomainService,
} from '../../../domain';
import { RegisterLogUseCase } from '../../use-cases';

export class AddLogWriteCommand<
  E1 extends EventDomainEntityBase,
  S1 extends IEventDomainService<E1>,
  P1 extends IAddLogPayload,
  R1 extends IAddLogResponse<E1>,
  A1 extends EventAggregate<E1, S1>,
> {
  constructor(
    private readonly eventAggregateRoot: A1,
    private readonly eventEntity: { new (payload: IEventDomainEntity): E1 },
  ) {}

  getCommand(): ICommand {
    return {
      name: LogWriteCommand.RegisterLog,
      command: RegisterLogUseCase<E1, S1, P1, R1, A1>,
      commandDependencies: [this.eventAggregateRoot, this.eventEntity],
    };
  }
}
