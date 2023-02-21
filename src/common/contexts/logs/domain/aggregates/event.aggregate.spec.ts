import { EventAggregate } from '.';
import { EventDomainEntityBase } from '../entities';
import { IEventDomainService } from '../services';

describe('EventDomainEntity', () => {
  let eventAggregate: EventAggregate<
    EventDomainEntityBase,
    IEventDomainService<EventDomainEntityBase>
  >;

  let mockEventService: IEventDomainService<EventDomainEntityBase>;

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
