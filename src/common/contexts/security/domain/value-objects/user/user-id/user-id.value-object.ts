import { ValueObjectBase } from '../../../../../../libs/sofka';
import { IsUUID } from '../../../../../../validations';
import { v4 as uuidv4 } from 'uuid';

export class UserIdValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : uuidv4());
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && IsUUID(this.value) === false) {
      const error = {
        field: 'userId',
        message: 'El ID no contiene una estructura válida UUIDv4',
      };
      this.setError(error);
    }
  }
}
