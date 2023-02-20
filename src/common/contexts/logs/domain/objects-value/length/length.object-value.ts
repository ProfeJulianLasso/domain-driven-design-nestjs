import { ObjectValueBase } from '../../../../../libs/sofka';
import { IsNumber } from '../../../../../validations';

export class LengthObjectValue extends ObjectValueBase<number> {
  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && IsNumber(this.value) === false) {
      const error = {
        field: 'length',
        message: 'El valor de length debe ser un número',
      };
      this.setError(error);
    }
  }
}
