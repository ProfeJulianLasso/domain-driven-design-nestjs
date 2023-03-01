import { ValueObjectBase } from '../../../../../../libs/sofka';
import {
  IsNumberAsString,
  StringMaxLength,
} from '../../../../../../validations';

export class DocumentValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && StringMaxLength(this.value, 10) === true) {
      const error = {
        field: 'document',
        message: 'El valor de "email" no puede ser mayor a 10 caracteres',
      };
      this.setError(error);
    } else if (this.value && IsNumberAsString(this.value) === false) {
      const error = {
        field: 'document',
        message: 'El valor de "document" no es un número válido',
      };
      this.setError(error);
    }
  }
}
