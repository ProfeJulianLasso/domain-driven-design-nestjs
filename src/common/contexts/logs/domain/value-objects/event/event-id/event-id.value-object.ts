import { v4 as uuid } from 'uuid';
import { ValueObjectBase } from '../../../../../../libs/sofka';
import { IsUUID } from '../../../../../../validations';

export class EventIdValueObject extends ValueObjectBase<string> {
  constructor(value?: string) {
    super(value ? value : uuid());
  }

  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && IsUUID(this.value) === false) {
      const error = {
        field: 'eventId',
        message: 'El ID no contiene una estructura válida UUIDv4',
      };
      this.setError(error);
    }
  }
}
