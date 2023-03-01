import { EventAggregateRoot } from '.';
import { IEventDomainService } from '../services';

describe('EventAggregate', () => {
  let eventAggregate: EventAggregateRoot;

  let mockEventService: IEventDomainService;

  beforeEach(() => {
    mockEventService = {
      getHistory: jest.fn(),
      addLog: jest.fn(),
    };
    eventAggregate = new EventAggregateRoot(mockEventService);
  });

  it('should be defined', () => {
    expect(eventAggregate).toBeDefined();
  });

  // TODO: Falta realizar las pruebas unitarias de EventAggregateRoot
});
