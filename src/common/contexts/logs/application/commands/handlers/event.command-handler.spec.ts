import { EventCommandHandler } from '.';
import { IUseCase } from '../../../../../libs/sofka';
import {
  EventAggregate,
  EventDomainEntity,
  IAddLogPayload,
  IAddLogResponse,
  IEventDomainService,
  IGetHistoryPayload,
  IGetHistoryResponse,
} from '../../../domain';
import { LogQueryCommand } from '../query';

describe('EventCommandHandler', () => {
  let eventCommandHandler: EventCommandHandler<
    EventDomainEntity,
    IEventDomainService<EventDomainEntity>,
    IGetHistoryPayload,
    IGetHistoryResponse<EventDomainEntity>,
    IAddLogPayload,
    IAddLogResponse<EventDomainEntity>,
    EventAggregate<EventDomainEntity, IEventDomainService<EventDomainEntity>>
  >;
  let mockEventService: IEventDomainService<EventDomainEntity>;
  let eventAggregateRoot: EventAggregate<
    EventDomainEntity,
    IEventDomainService<EventDomainEntity>
  >;

  beforeEach(() => {
    mockEventService = {
      getHistory: jest.fn(),
      addLog: jest.fn(),
    };
    eventAggregateRoot = new EventAggregate(mockEventService);
    eventCommandHandler = new EventCommandHandler(
      eventAggregateRoot,
      EventDomainEntity,
    );
  });

  it('should be defined', () => {
    expect(eventCommandHandler).toBeDefined();
  });

  it('should run the GetHistoryLogs use case correctly', async () => {
    // Arrange
    const expected = undefined;
    const payload: IGetHistoryPayload = {
      page: 0,
      length: 2,
      dateTimeInit: Date.now() - 120,
      dateTimeEnd: Date.now(),
    };
    const useCase: IUseCase<
      IGetHistoryPayload,
      IGetHistoryResponse<EventDomainEntity>
    > = {
      execute: jest.fn(),
      executeValidations: jest.fn(),
    };

    jest.spyOn(eventCommandHandler as any, 'hasCommand');
    jest
      .spyOn(eventCommandHandler as any, 'getCommand')
      .mockReturnValue(useCase);
    jest.spyOn(useCase, 'execute');
    jest.spyOn(eventCommandHandler as any, 'hasDomainEvent');
    jest.spyOn(eventCommandHandler as any, 'executeDomainEvent');

    // Act
    const response = await eventCommandHandler.executeCommand<
      IGetHistoryPayload,
      IGetHistoryResponse<EventDomainEntity>
    >(LogQueryCommand.GetHistoryLogs, payload);

    // Assert
    expect((eventCommandHandler as any).hasCommand).toBeCalledWith(
      LogQueryCommand.GetHistoryLogs,
    );
    expect((eventCommandHandler as any).getCommand).toBeCalledWith(
      LogQueryCommand.GetHistoryLogs,
    );
    expect(useCase.execute).toBeCalledWith(payload);
    expect((eventCommandHandler as any).hasDomainEvent).toBeCalledWith(
      LogQueryCommand.GetHistoryLogs,
    );
    expect((eventCommandHandler as any).executeDomainEvent).not.toBeCalledWith(
      LogQueryCommand.GetHistoryLogs,
      payload,
    );
    expect(response).toEqual(expected);
  });
});
