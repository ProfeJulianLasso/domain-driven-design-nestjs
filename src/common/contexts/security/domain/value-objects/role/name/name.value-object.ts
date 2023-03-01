import { ValueObjectBase } from '../../../../../../libs/sofka';
import { StringMaxLength } from '../../../../../../validations';

export class NameValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    // if (IsEmpty(this.value) === true) {
    //   const error = {
    //     field: 'name',
    //     message: 'El valor de "name" es obligatorio',
    //   };
    //   this.setError(error);
    // } else
    if (this.value && StringMaxLength(this.value, 100) === true) {
      const error = {
        field: 'name',
        message: 'El valor de "name" no puede ser mayor a 100 caracteres',
      };
      this.setError(error);
    }
  }
}
