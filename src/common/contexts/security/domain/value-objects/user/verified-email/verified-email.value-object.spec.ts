import { VerifiedEmailValueObject } from '.';

describe('IdValueObject', () => {
  let verifiedEmailValueObject: VerifiedEmailValueObject;

  beforeEach(() => {
    verifiedEmailValueObject = new VerifiedEmailValueObject();
  });

  it('should be defined', () => {
    expect(verifiedEmailValueObject).toBeDefined();
  });
});
