import {
  ErrorHandlerForValueObjectsBase,
  IUseCase,
  ObjectValueException,
} from '../../../../../libs/sofka';
import {
  DateTimeEndObjectValue,
  DateTimeInitObjectValue,
  EventAggregate,
  EventDomainEntity,
  IEventDomainService,
  IGetHistoryPayload,
  IGetHistoryResponse,
  LengthObjectValue,
  PageObjectValue,
} from '../../../domain';

export class GetHistoryLogsUseCase<
    E1 extends EventDomainEntity,
    S1 extends IEventDomainService<E1>,
    P1 extends IGetHistoryPayload,
    R1 extends IGetHistoryResponse<E1>,
    A1 extends EventAggregate<E1, S1>,
  >
  extends ErrorHandlerForValueObjectsBase
  implements IUseCase<P1, R1>
{
  constructor(private readonly eventAggregateRoot: A1) {
    super();
  }

  async execute(payload?: P1): Promise<R1> {
    const { page, length, dateTimeInit, dateTimeEnd } =
      this.executeValidations(payload);
    let data = await this.eventAggregateRoot.getHistory(
      page,
      length,
      dateTimeInit,
      dateTimeEnd,
    );
    if (data === null) data = new Array<E1>();
    const result = { ...payload, data } as R1;
    return result;
  }

  executeValidations(payload?: P1): {
    page: PageObjectValue;
    length: LengthObjectValue;
    dateTimeInit: DateTimeInitObjectValue;
    dateTimeEnd: DateTimeEndObjectValue;
  } {
    const page = new PageObjectValue(payload?.page);
    const length = new LengthObjectValue(payload?.length);
    const dateTimeInit = new DateTimeInitObjectValue(payload?.dateTimeInit);
    const dateTimeEnd = new DateTimeEndObjectValue(payload?.dateTimeEnd);

    if (page && page.hasErrors()) this.setErrors(page.getErrors());

    if (length && length.hasErrors()) this.setErrors(length.getErrors());

    if (dateTimeInit && dateTimeInit.hasErrors())
      this.setErrors(dateTimeInit.getErrors());

    if (dateTimeEnd && dateTimeEnd.hasErrors())
      this.setErrors(dateTimeEnd.getErrors());

    if (this.hasErrors() === true)
      throw new ObjectValueException(
        'Hay algunos errores en la información del paginador',
        this.getErrors(),
      );
    return { page, length, dateTimeInit, dateTimeEnd };
  }
}
