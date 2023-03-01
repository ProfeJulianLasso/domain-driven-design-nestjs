import { ContactInformationIdValueObject } from '.';

describe('ContactInformationIdValueObject', () => {
  let contactInformationIdValueObject: ContactInformationIdValueObject;

  beforeEach(() => {
    contactInformationIdValueObject = new ContactInformationIdValueObject();
  });

  it('should be defined', () => {
    expect(contactInformationIdValueObject).toBeDefined();
  });

  it('should be an error that the ID structure is malformed', () => {
    // Arrange
    contactInformationIdValueObject.value =
      '2f65a11d-2fad-49b6-a778-875b77a84ea';

    // Act
    contactInformationIdValueObject.validateData();
    const errors = contactInformationIdValueObject.getErrors();

    // Assert
    expect(contactInformationIdValueObject.hasErrors()).toStrictEqual(true);
    expect(JSON.stringify(errors)).toContain(
      'El ID no contiene una estructura válida UUIDv4',
    );
  });

  it('should yield a well-formed and error-free ID', () => {
    // Arrange
    const expected = 'de392cd6-e80a-41a1-a6e9-9a1a55c9b08d';
    contactInformationIdValueObject.value =
      'de392cd6-e80a-41a1-a6e9-9a1a55c9b08d';

    // Act
    contactInformationIdValueObject.validateData();

    // Assert
    expect(contactInformationIdValueObject.value).toEqual(expected);
  });
});
