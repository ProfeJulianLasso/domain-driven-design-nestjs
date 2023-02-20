import { EventAggregate } from '.';
import { EventDomainEntity } from '../entities';
import { IEventDomainService } from '../services';

describe('EventDomainEntity', () => {
  let eventAggregate: EventAggregate<
    EventDomainEntity,
    IEventDomainService<EventDomainEntity>
  >;

  let mockEventService: IEventDomainService<EventDomainEntity>;

  beforeEach(() => {
    mockEventService = {
      getHistory: jest.fn(),
      addLog: jest.fn(),
    };
    eventAggregate = new EventAggregate(mockEventService);
  });

  it('should be defined', () => {
    expect(eventAggregate).toBeDefined();
  });

  // TODO: Falta realizar las pruebas unitarias de EventDomainEntity
});
