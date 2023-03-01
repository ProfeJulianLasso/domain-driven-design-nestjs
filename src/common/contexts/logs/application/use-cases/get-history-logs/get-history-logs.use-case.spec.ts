import { GetHistoryLogsUseCase } from '.';
import {
  DateTimeEndValueObject,
  DateTimeInitValueObject,
  EventAggregateRoot,
  EventDomainEntityBase,
  IEventDomainEntity,
  IEventDomainService,
  IGetHistoryCommand,
  LengthValueObject,
  PageValueObject,
} from '../../../domain';

describe('GetHistoryUseCase', () => {
  let getHistoryUseCase: GetHistoryLogsUseCase<IGetHistoryCommand>;
  let mockEventService: IEventDomainService;
  let mockEventAggregate: EventAggregateRoot;

  beforeEach(() => {
    mockEventService = {
      getHistory: jest.fn(),
      addLog: jest.fn(),
    } as IEventDomainService;
    mockEventAggregate = new EventAggregateRoot(mockEventService);
    getHistoryUseCase = new GetHistoryLogsUseCase<IGetHistoryCommand>(
      mockEventAggregate,
    );
  });

  it('should be defined', () => {
    expect(getHistoryUseCase).toBeDefined();
  });

  it('should bring empty data without a payload, if there is no information in the database', async () => {
    // Arrange
    const payload = undefined;
    const stub = null;
    const expected = { data: [] };
    const pageValueObject = new PageValueObject();
    const lengthValueObject = new LengthValueObject();
    const dateTimeInitValueObject = new DateTimeInitValueObject();
    const dateTimeEndValueObject = new DateTimeEndValueObject();
    jest.spyOn(mockEventAggregate, 'getHistory').mockResolvedValue(stub);

    // Act
    const result = await getHistoryUseCase.execute(payload);

    // Assert
    expect(mockEventAggregate.getHistory).toBeCalledWith(
      pageValueObject,
      lengthValueObject,
      dateTimeInitValueObject,
      dateTimeEndValueObject,
    );
    expect(result).toEqual(expected);
  });

  it('should bring empty data with payload, if there is no information in the database', async () => {
    // Arrange
    const payload = {
      page: 1,
      length: 5,
      dateTimeInit: Date.now() - 120,
      dateTimeEnd: Date.now(),
    } as IGetHistoryCommand;
    const stub = null;
    const expected = { ...payload, data: [] };
    const pageValueObject = new PageValueObject(payload.page);
    const lengthValueObject = new LengthValueObject(payload.length);
    const dateTimeInitValueObject = new DateTimeInitValueObject(
      payload.dateTimeInit,
    );
    const dateTimeEndValueObject = new DateTimeEndValueObject(
      payload.dateTimeEnd,
    );
    jest.spyOn(mockEventAggregate, 'getHistory').mockResolvedValue(stub);

    // Act
    const result = await getHistoryUseCase.execute(payload);

    // Assert
    expect(mockEventAggregate.getHistory).toBeCalledWith(
      pageValueObject,
      lengthValueObject,
      dateTimeInitValueObject,
      dateTimeEndValueObject,
    );
    expect(result).toEqual(expected);
  });

  it('should bring all data without payload', async () => {
    // Arrange
    const payload = undefined;
    const dateTime = Date.now();
    const item1 = new EventDomainEntityBase({
      context: 'accounts',
      aggregateRoot: 'customer',
      eventName: 'registeredUser',
      dateTime,
    } as IEventDomainEntity);
    const item2 = new EventDomainEntityBase({
      context: 'transactions',
      aggregateRoot: 'account',
      eventName: 'registeredDeposit',
      dateTime,
    } as IEventDomainEntity);

    const pageValueObject = new PageValueObject();
    const lengthValueObject = new LengthValueObject();
    const dateTimeInitValueObject = new DateTimeInitValueObject();
    const dateTimeEndValueObject = new DateTimeEndValueObject();

    const stub = new Array<EventDomainEntityBase>();
    stub.push(item1);
    stub.push(item2);

    const expected = { data: stub };
    jest.spyOn(mockEventAggregate, 'getHistory').mockResolvedValue(stub);

    // Act
    const result = await getHistoryUseCase.execute(payload);

    // Assert
    expect(mockEventAggregate.getHistory).toBeCalledWith(
      pageValueObject,
      lengthValueObject,
      dateTimeInitValueObject,
      dateTimeEndValueObject,
    );
    expect(result).toEqual(expected);
  });

  it('should bring all data with payload', async () => {
    // Arrange
    const payload = {
      page: 0,
      length: 5,
      dateTimeInit: Date.now() - 120,
      dateTimeEnd: Date.now(),
    } as IGetHistoryCommand;
    const dateTime = Date.now();
    const item1 = new EventDomainEntityBase({
      context: 'accounts',
      aggregateRoot: 'customer',
      eventName: 'registeredUser',
      dateTime,
    } as IEventDomainEntity);
    const item2 = new EventDomainEntityBase({
      context: 'transactions',
      aggregateRoot: 'account',
      eventName: 'registeredDeposit',
      dateTime,
    } as IEventDomainEntity);

    const pageValueObject = new PageValueObject(payload.page);
    const lengthValueObject = new LengthValueObject(payload.length);
    const dateTimeInitValueObject = new DateTimeInitValueObject(
      payload.dateTimeInit,
    );
    const dateTimeEndValueObject = new DateTimeEndValueObject(
      payload.dateTimeEnd,
    );

    const stub = new Array<EventDomainEntityBase>();
    stub.push(item1);
    stub.push(item2);

    const expected = { ...payload, data: stub };
    jest.spyOn(mockEventAggregate, 'getHistory').mockResolvedValue(stub);

    // Act
    const result = await getHistoryUseCase.execute(payload);

    // Assert
    expect(mockEventAggregate.getHistory).toBeCalledWith(
      pageValueObject,
      lengthValueObject,
      dateTimeInitValueObject,
      dateTimeEndValueObject,
    );
    expect(result).toEqual(expected);
  });
});
