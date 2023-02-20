import { ObjectValueBase } from '../../../../../libs/sofka/bases';
import {
  IsDateTimeGraterThanCurrentDateTime,
  IsEmpty,
} from '../../../../../validations';

export class DateTimeObjectValue extends ObjectValueBase<number> {
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
