import { v4 as uuid } from 'uuid';
import { ObjectValueBase } from '../../../../../libs/sofka/bases';
import { IsUUID } from '../../../../../validations';

export class IdObjectValue extends ObjectValueBase<string> {
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
