import { ValueObjectBase } from '../../../../../../libs/sofka';
import { IsBoolean } from '../../../../../../validations';

export class VerifiedEmailValueObject extends ValueObjectBase<boolean> {
  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (this.value && IsBoolean(this.value) === false) {
      const error = {
        field: 'verifiedEmail',
        message: 'El valor de verifiedEmail no es un valor válido',
      };
      this.setError(error);
    }
  }
}
