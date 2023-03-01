import { IUseCase } from '../../../../../libs/sofka';
import {
  EventAggregateRoot,
  EventDomainEntityBase,
  IAddLogCommand,
  IAddLogResponse,
  IEventDomainService,
} from '../../../domain';

export class RegisterLogUseCase<CommandType extends IAddLogCommand>
  implements IUseCase<CommandType, IAddLogResponse>
{
  private readonly eventAggregateRoot: EventAggregateRoot;

  constructor(private readonly eventService: IEventDomainService) {
    this.eventAggregateRoot = new EventAggregateRoot(this.eventService);
  }

  async execute(command: CommandType): Promise<IAddLogResponse> {
    const entity = this.executeValidations(command);
    const data = await this.eventAggregateRoot.addLog(entity);
    return { data } as IAddLogResponse;
  }

  executeValidations(command: CommandType): EventDomainEntityBase {
    return new EventDomainEntityBase({ ...command }).validateData();
  }
}
