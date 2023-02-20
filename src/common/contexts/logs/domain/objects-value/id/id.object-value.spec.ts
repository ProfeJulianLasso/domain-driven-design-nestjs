import { IdObjectValue } from '.';

describe('IdObjectValue', () => {
  let idObjectValue: IdObjectValue;

  beforeEach(() => {
    idObjectValue = new IdObjectValue();
  });

  it('should be defined', () => {
    expect(idObjectValue).toBeDefined();
  });

  it('should be an error that the ID structure is malformed', () => {
    // Arrange
    idObjectValue.value = '2f65a11d-2fad-49b6-a778-875b77a84ea';

    // Act
    idObjectValue.validateData();
    const errors = idObjectValue.getErrors();

    // Assert
    expect(idObjectValue.hasErrors()).toStrictEqual(true);
    expect(JSON.stringify(errors)).toContain(
      'El ID no contiene una estructura válida UUIDv4',
    );
  });

  it('should yield a well-formed and error-free ID', () => {
    // Arrange
    const expected = 'de392cd6-e80a-41a1-a6e9-9a1a55c9b08d';
    idObjectValue.value = 'de392cd6-e80a-41a1-a6e9-9a1a55c9b08d';

    // Act
    idObjectValue.validateData();

    // Assert
    expect(idObjectValue.value).toEqual(expected);
  });
});
