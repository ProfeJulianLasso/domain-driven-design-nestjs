import { PageObjectValue } from '.';

describe('PageObjectValue', () => {
  let dateTimeObjectValue: PageObjectValue;

  beforeEach(() => {
    dateTimeObjectValue = new PageObjectValue();
  });

  it('should be defined', () => {
    expect(dateTimeObjectValue).toBeDefined();
  });

  // TODO: Falta realizar las pruebas unitarias de PageObjectValue
});
