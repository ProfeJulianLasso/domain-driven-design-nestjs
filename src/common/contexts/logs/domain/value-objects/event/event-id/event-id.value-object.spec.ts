import { EventIdValueObject } from '.';

describe('IdValueObject', () => {
  let valueObject: EventIdValueObject;

  beforeEach(() => {
    valueObject = new EventIdValueObject();
  });

  it('should be defined', () => {
    expect(valueObject).toBeDefined();
  });

  it('should be an error that the ID structure is malformed', () => {
    // Arrange
    valueObject.value = '2f65a11d-2fad-49b6-a778-875b77a84ea';

    // Act
    valueObject.validateData();
    const errors = valueObject.getErrors();

    // Assert
    expect(valueObject.hasErrors()).toStrictEqual(true);
    expect(JSON.stringify(errors)).toContain(
      'El ID no contiene una estructura válida UUIDv4',
    );
  });

  it('should yield a well-formed and error-free ID', () => {
    // Arrange
    const expected = 'de392cd6-e80a-41a1-a6e9-9a1a55c9b08d';
    valueObject.value = 'de392cd6-e80a-41a1-a6e9-9a1a55c9b08d';

    // Act
    valueObject.validateData();

    // Assert
    expect(valueObject.value).toEqual(expected);
  });
});
