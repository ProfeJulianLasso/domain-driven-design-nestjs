import { StateValueObject } from '.';

describe('StateValueObject', () => {
  let stateValueObject: StateValueObject;

  beforeEach(() => {
    stateValueObject = new StateValueObject();
  });

  it('should be defined', () => {
    expect(stateValueObject).toBeDefined();
  });
});
