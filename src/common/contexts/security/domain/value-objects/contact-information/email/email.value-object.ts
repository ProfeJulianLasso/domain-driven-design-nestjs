import { ValueObjectBase } from '../../../../../../libs/sofka';
import { IsEmail, StringMaxLength } from '../../../../../../validations';

export class EmailValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && StringMaxLength(this.value, 100) === true) {
      const error = {
        field: 'email',
        message: 'El valor de "email" no puede ser mayor a 100 caracteres',
      };
      this.setError(error);
    } else if (this.value && IsEmail(this.value) === false) {
      const error = {
        field: 'email',
        message: 'El valor de "email" no es un correo válido',
      };
      this.setError(error);
    }
  }
}
