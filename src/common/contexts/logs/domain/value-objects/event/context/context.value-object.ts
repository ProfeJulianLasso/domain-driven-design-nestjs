import { ValueObjectBase } from '../../../../../../libs/sofka';
import { IsEmpty, StringMaxLength } from '../../../../../../validations';

export class ContextValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (IsEmpty(this.value) === true) {
      const error = {
        field: 'context',
        message: 'El valor de context es obligatorio',
      };
      this.setError(error);
    } else if (this.value && StringMaxLength(this.value, 50) === true) {
      const error = {
        field: 'context',
        message: 'El valor de context no puede ser mayor a 50 caracteres',
      };
      this.setError(error);
    }
  }
}
