import { ValueObjectBase } from '../../../../../../libs/sofka';
import {
  IsEmpty,
  IsStringAsJSON,
  StringMaxLength,
} from '../../../../../../validations';

export class PayloadValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (IsEmpty(this.value) === true) {
      const error = {
        field: 'payload',
        message: 'El valor de payload es obligatorio',
      };
      this.setError(error);
    } else if (this.value && IsStringAsJSON(this.value) === false) {
      const error = {
        field: 'payload',
        message: 'El payload debe ser un objeto válido',
      };
      this.setError(error);
    } else if (this.value && StringMaxLength(this.value, 100000) === true) {
      const error = {
        field: 'payload',
        message: 'El valor de payload no puede ser mayor a 100.000 caracteres',
      };
      this.setError(error);
    }
  }
}
