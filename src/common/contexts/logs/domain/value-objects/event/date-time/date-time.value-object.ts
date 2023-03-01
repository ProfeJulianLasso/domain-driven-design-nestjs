import { ValueObjectBase } from '../../../../../../libs/sofka';
import {
  IsDateTimeGraterThanCurrentDateTime,
  IsEmpty,
} from '../../../../../../validations';

export class DateTimeValueObject extends ValueObjectBase<number> {
  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (IsEmpty(this.value) === true) {
      const error = {
        field: 'dateTime',
        message: 'El valor del dateTime es obligatorio',
      };
      this.setError(error);
    } else if (IsDateTimeGraterThanCurrentDateTime(this.value) === true) {
      const error = {
        field: 'dateTime',
        message: 'La fecha y hora dada es mayor a la fecha y hora actual',
      };
      this.setError(error);
    }
  }
}
