import {
  DateTimeEndValueObject,
  DateTimeInitValueObject,
  EventAggregateRoot,
  EventDomainEntityBase,
  IEventDomainService,
  IGetHistoryCommand,
  IGetHistoryResponse,
  LengthValueObject,
  PageValueObject,
} from '../../../domain';
import {
  ValueObjectErrorHandler,
  IUseCase,
  ValueObjectException,
} from '../../../../../libs/sofka';

export class GetHistoryLogsUseCase<
    CommandType extends IGetHistoryCommand = IGetHistoryCommand,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<CommandType, IGetHistoryResponse>
{
  private readonly eventAggregateRoot: EventAggregateRoot;

  constructor(private readonly eventService: IEventDomainService) {
    super();
    this.eventAggregateRoot = new EventAggregateRoot(this.eventService);
  }

  async execute(command?: CommandType): Promise<IGetHistoryResponse> {
    const { page, length, dateTimeInit, dateTimeEnd } =
      this.executeValidations(command);
    let data = await this.eventAggregateRoot.getHistory(
      page,
      length,
      dateTimeInit,
      dateTimeEnd,
    );
    if (data === null || data === undefined)
      data = new Array<EventDomainEntityBase>();
    return { ...command, data } as IGetHistoryResponse;
  }

  executeValidations(command?: CommandType): {
    page: PageValueObject;
    length: LengthValueObject;
    dateTimeInit: DateTimeInitValueObject;
    dateTimeEnd: DateTimeEndValueObject;
  } {
    const page = new PageValueObject(command?.page);
    const length = new LengthValueObject(command?.length);
    const dateTimeInit = new DateTimeInitValueObject(command?.dateTimeInit);
    const dateTimeEnd = new DateTimeEndValueObject(command?.dateTimeEnd);

    if (page && page.hasErrors()) this.setErrors(page.getErrors());

    if (length && length.hasErrors()) this.setErrors(length.getErrors());

    if (dateTimeInit && dateTimeInit.hasErrors())
      this.setErrors(dateTimeInit.getErrors());

    if (dateTimeEnd && dateTimeEnd.hasErrors())
      this.setErrors(dateTimeEnd.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en la información del paginador',
        this.getErrors(),
      );

    return { page, length, dateTimeInit, dateTimeEnd };
  }
}
