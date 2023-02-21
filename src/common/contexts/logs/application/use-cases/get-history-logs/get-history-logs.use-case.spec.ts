/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetHistoryLogsUseCase } from '.';
import {
  DateTimeEndObjectValue,
  DateTimeInitObjectValue,
  EventAggregate,
  EventDomainEntityBase,
  IEventDomainEntity,
  IEventDomainService,
  IGetHistoryPayload,
  IGetHistoryResponse,
  LengthObjectValue,
  PageObjectValue,
} from '../../../domain';

class EventEntity extends EventDomainEntityBase {}

describe('GetHistoryUseCase', () => {
  let getHistoryUseCase: GetHistoryLogsUseCase<
    EventEntity,
    IEventDomainService<EventEntity>,
    IGetHistoryPayload,
    IGetHistoryResponse<EventEntity>,
    EventAggregate<EventEntity, IEventDomainService<EventEntity>>
  >;
  let mockEventService: IEventDomainService<EventEntity>;
  let mockEventAggregate: EventAggregate<
    EventEntity,
    IEventDomainService<EventEntity>
  >;

  beforeEach(() => {
    mockEventService = {
      getHistory: jest.fn(),
      addLog: jest.fn(),
    } as IEventDomainService<EventEntity>;
    mockEventAggregate = new EventAggregate(mockEventService);
    getHistoryUseCase = new GetHistoryLogsUseCase<
      EventEntity,
      IEventDomainService<EventEntity>,
      IGetHistoryPayload,
      IGetHistoryResponse<EventEntity>,
      EventAggregate<EventEntity, IEventDomainService<EventEntity>>
    >(mockEventAggregate);
  });

  it('should be defined', () => {
    expect(getHistoryUseCase).toBeDefined();
  });

  it('should bring empty data without a payload, if there is no information in the database', async () => {
    // Arrange
    const payload = undefined;
    const stub = null;
    const expected = { data: [] };
    const pageObjectValue = new PageObjectValue();
    const lengthObjectValue = new LengthObjectValue();
    const dateTimeInitObjectValue = new DateTimeInitObjectValue();
    const dateTimeEndObjectValue = new DateTimeEndObjectValue();
    jest.spyOn(mockEventAggregate, 'getHistory').mockResolvedValue(stub);

    // Act
    const result = await getHistoryUseCase.execute(payload);

    // Assert
    expect(mockEventAggregate.getHistory).toBeCalledWith(
      pageObjectValue,
      lengthObjectValue,
      dateTimeInitObjectValue,
      dateTimeEndObjectValue,
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
    } as IGetHistoryPayload;
    const stub = null;
    const expected = { ...payload, data: [] };
    const pageObjectValue = new PageObjectValue(payload.page);
    const lengthObjectValue = new LengthObjectValue(payload.length);
    const dateTimeInitObjectValue = new DateTimeInitObjectValue(
      payload.dateTimeInit,
    );
    const dateTimeEndObjectValue = new DateTimeEndObjectValue(
      payload.dateTimeEnd,
    );
    jest.spyOn(mockEventAggregate, 'getHistory').mockResolvedValue(stub);

    // Act
    const result = await getHistoryUseCase.execute(payload);

    // Assert
    expect(mockEventAggregate.getHistory).toBeCalledWith(
      pageObjectValue,
      lengthObjectValue,
      dateTimeInitObjectValue,
      dateTimeEndObjectValue,
    );
    expect(result).toEqual(expected);
  });

  it('should bring all data without payload', async () => {
    // Arrange
    const payload = undefined;
    const dateTime = Date.now();
    const item1 = new EventEntity({
      context: 'accounts',
      aggregateRoot: 'customer',
      eventName: 'registeredUser',
      dateTime,
    } as IEventDomainEntity);
    const item2 = new EventEntity({
      context: 'transactions',
      aggregateRoot: 'account',
      eventName: 'registeredDeposit',
      dateTime,
    } as IEventDomainEntity);

    const pageObjectValue = new PageObjectValue();
    const lengthObjectValue = new LengthObjectValue();
    const dateTimeInitObjectValue = new DateTimeInitObjectValue();
    const dateTimeEndObjectValue = new DateTimeEndObjectValue();

    const stub = new Array<EventEntity>();
    stub.push(item1);
    stub.push(item2);

    const expected = { data: stub };
    jest.spyOn(mockEventAggregate, 'getHistory').mockResolvedValue(stub);

    // Act
    const result = await getHistoryUseCase.execute(payload);

    // Assert
    expect(mockEventAggregate.getHistory).toBeCalledWith(
      pageObjectValue,
      lengthObjectValue,
      dateTimeInitObjectValue,
      dateTimeEndObjectValue,
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
    } as IGetHistoryPayload;
    const dateTime = Date.now();
    const item1 = new EventEntity({
      context: 'accounts',
      aggregateRoot: 'customer',
      eventName: 'registeredUser',
      dateTime,
    } as IEventDomainEntity);
    const item2 = new EventEntity({
      context: 'transactions',
      aggregateRoot: 'account',
      eventName: 'registeredDeposit',
      dateTime,
    } as IEventDomainEntity);

    const pageObjectValue = new PageObjectValue(payload.page);
    const lengthObjectValue = new LengthObjectValue(payload.length);
    const dateTimeInitObjectValue = new DateTimeInitObjectValue(
      payload.dateTimeInit,
    );
    const dateTimeEndObjectValue = new DateTimeEndObjectValue(
      payload.dateTimeEnd,
    );

    const stub = new Array<EventEntity>();
    stub.push(item1);
    stub.push(item2);

    const expected = { ...payload, data: stub };
    jest.spyOn(mockEventAggregate, 'getHistory').mockResolvedValue(stub);

    // Act
    const result = await getHistoryUseCase.execute(payload);

    // Assert
    expect(mockEventAggregate.getHistory).toBeCalledWith(
      pageObjectValue,
      lengthObjectValue,
      dateTimeInitObjectValue,
      dateTimeEndObjectValue,
    );
    expect(result).toEqual(expected);
  });
});
