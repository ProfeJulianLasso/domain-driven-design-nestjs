import { EventCommandHandler } from '.';
import { IUseCase } from '../../../../../libs/sofka';
import {
  EventAggregate,
  EventDomainEntityBase,
  IAddLogPayload,
  IAddLogResponse,
  IEventDomainService,
  IGetHistoryPayload,
  IGetHistoryResponse,
} from '../../../domain';
import { LogQueryCommand } from '../query';

class EventEntity extends EventDomainEntityBase {}

describe('EventCommandHandler', () => {
  let eventCommandHandler: EventCommandHandler<
    EventEntity,
    IEventDomainService<EventEntity>,
    IGetHistoryPayload,
    IGetHistoryResponse<EventEntity>,
    IAddLogPayload,
    IAddLogResponse<EventEntity>,
    EventAggregate<EventEntity, IEventDomainService<EventEntity>>
  >;
  let mockEventService: IEventDomainService<EventEntity>;
  let eventAggregateRoot: EventAggregate<
    EventEntity,
    IEventDomainService<EventEntity>
  >;

  beforeEach(() => {
    mockEventService = {
      getHistory: jest.fn(),
      addLog: jest.fn(),
    };
    eventAggregateRoot = new EventAggregate(mockEventService);
    eventCommandHandler = new EventCommandHandler(
      eventAggregateRoot,
      EventEntity,
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
      IGetHistoryResponse<EventEntity>
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
      IGetHistoryResponse<EventEntity>
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
