import { ValueObjectBase } from '../../../../../../libs/sofka';
import { StringMaxLength } from '../../../../../../validations';

export class LastnameValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && StringMaxLength(this.value, 100) === true) {
      const error = {
        field: 'lastname',
        message: 'El valor de "lastname" no puede ser mayor a 100 caracteres',
      };
      this.setError(error);
    }
  }
}
