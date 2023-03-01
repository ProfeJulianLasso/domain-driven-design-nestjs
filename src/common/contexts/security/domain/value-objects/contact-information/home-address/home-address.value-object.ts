import { ValueObjectBase } from '../../../../../../libs/sofka';
import { StringMaxLength } from '../../../../../../validations';

export class HomeAddressValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && StringMaxLength(this.value, 200) === true) {
      const error = {
        field: 'homeAddress',
        message:
          'El valor de "homeAddress" no puede ser mayor a 200 caracteres',
      };
      this.setError(error);
    }
  }
}
