import { ValueObjectBase } from '../../../../../../libs/sofka';
import { IsBoolean } from '../../../../../../validations';

export class StateValueObject extends ValueObjectBase<boolean> {
  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    // if (IsEmpty(this.value) === true) {
    //   const error = {
    //     field: 'state',
    //     message: 'El valor de "state" es obligatorio',
    //   };
    //   this.setError(error);
    // } else
    if (this.value && IsBoolean(this.value) === false) {
      const error = {
        field: 'state',
        message: 'El valor de "state" no es un valor válido',
      };
      this.setError(error);
    }
  }
}
