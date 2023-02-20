import { ObjectValueBase } from '../../../../../libs/sofka/bases';
import { IsEmpty, StringMaxLength } from '../../../../../validations';

export class AggregateRootObjectValue extends ObjectValueBase<string> {
  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (IsEmpty(this.value) === true) {
      const error = {
        field: 'aggregateRoot',
        message: 'El valor de aggregateRoot es obligatorio',
      };
      this.setError(error);
    } else if (this.value && StringMaxLength(this.value, 50) === true) {
      const error = {
        field: 'aggregateRoot',
        message: 'El valor de aggregateRoot no puede ser mayor a 50 caracteres',
      };
      this.setError(error);
    }
  }
}
