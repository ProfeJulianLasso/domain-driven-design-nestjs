import { ValueObjectBase } from '../../../../../../libs/sofka';
import { IsNumber } from '../../../../../../validations';

export class PageValueObject extends ValueObjectBase<number> {
  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && IsNumber(this.value) === false) {
      const error = {
        field: 'page',
        message: 'El valor de page debe ser un número',
      };
      this.setError(error);
    }
  }
}
