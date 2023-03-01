import { UserIdValueObject } from '.';

describe('UserIdValueObject', () => {
  let userIdValueObject: UserIdValueObject;

  beforeEach(() => {
    userIdValueObject = new UserIdValueObject();
  });

  it('should be defined', () => {
    expect(userIdValueObject).toBeDefined();
  });

  it('should be an error that the ID structure is malformed', () => {
    // Arrange
    userIdValueObject.value = '2f65a11d-2fad-49b6-a778-875b77a84ea';

    // Act
    userIdValueObject.validateData();
    const errors = userIdValueObject.getErrors();

    // Assert
    expect(userIdValueObject.hasErrors()).toStrictEqual(true);
    expect(JSON.stringify(errors)).toContain(
      'El ID no contiene una estructura válida UUIDv4',
    );
  });

  it('should yield a well-formed and error-free ID', () => {
    // Arrange
    const expected = 'de392cd6-e80a-41a1-a6e9-9a1a55c9b08d';
    userIdValueObject.value = 'de392cd6-e80a-41a1-a6e9-9a1a55c9b08d';

    // Act
    userIdValueObject.validateData();

    // Assert
    expect(userIdValueObject.value).toEqual(expected);
  });
});
