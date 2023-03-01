import { UserAggregateRoot } from '.';

describe('UserAggregateRoot', () => {
  let aggregateRoot: UserAggregateRoot;

  beforeEach(() => {
    aggregateRoot = new UserAggregateRoot({});
  });

  it('should be defined', () => {
    expect(aggregateRoot).toBeDefined();
  });
});
