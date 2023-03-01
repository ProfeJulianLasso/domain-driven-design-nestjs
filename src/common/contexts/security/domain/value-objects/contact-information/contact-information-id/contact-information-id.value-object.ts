import { v4 as uuidv4 } from 'uuid';
import { ValueObjectBase } from '../../../../../../libs/sofka';
import { IsUUID } from '../../../../../../validations';

export class ContactInformationIdValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : uuidv4());
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && IsUUID(this.value) === false) {
      const error = {
        field: 'contactInformationId',
        message: 'El ID no contiene una estructura válida UUIDv4',
      };
      this.setError(error);
    }
  }
}
