import { ValueObjectBase } from '../../../../../../libs/sofka';
import { StringMaxLength } from '../../../../../../validations';

export class DescriptionValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    // if (IsEmpty(this.value) === true) {
    //   const error = {
    //     field: 'description',
    //     message: 'El valor de "description" es obligatorio',
    //   };
    //   this.setError(error);
    // } else
    if (this.value && StringMaxLength(this.value, 2048) === true) {
      const error = {
        field: 'description',
        message:
          'El valor de "description" no puede ser mayor a 2048 caracteres',
      };
      this.setError(error);
    }
  }
}
