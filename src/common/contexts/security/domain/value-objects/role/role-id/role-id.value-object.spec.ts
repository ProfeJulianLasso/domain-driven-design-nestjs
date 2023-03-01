import { RoleIdValueObject } from '.';

describe('RoleIdValueObject', () => {
  let roleIdValueObject: RoleIdValueObject;

  beforeEach(() => {
    roleIdValueObject = new RoleIdValueObject();
  });

  it('should be defined', () => {
    expect(roleIdValueObject).toBeDefined();
  });

  it('should be an error that the ID structure is malformed', () => {
    // Arrange
    roleIdValueObject.value = '2f65a11d-2fad-49b6-a778-875b77a84ea';

    // Act
    roleIdValueObject.validateData();
    const errors = roleIdValueObject.getErrors();

    // Assert
    expect(roleIdValueObject.hasErrors()).toStrictEqual(true);
    expect(JSON.stringify(errors)).toContain(
      'El ID no contiene una estructura válida UUIDv4',
    );
  });

  it('should yield a well-formed and error-free ID', () => {
    // Arrange
    const expected = 'de392cd6-e80a-41a1-a6e9-9a1a55c9b08d';
    roleIdValueObject.value = 'de392cd6-e80a-41a1-a6e9-9a1a55c9b08d';

    // Act
    roleIdValueObject.validateData();

    // Assert
    expect(roleIdValueObject.value).toEqual(expected);
  });
});
