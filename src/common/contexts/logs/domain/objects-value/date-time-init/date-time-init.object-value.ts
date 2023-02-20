import { ObjectValueBase } from '../../../../../libs/sofka/bases';
import { IsDateTimeGraterThanCurrentDateTime } from '../../../../../validations';

export class DateTimeInitObjectValue extends ObjectValueBase<number> {
  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (
      this.value &&
      IsDateTimeGraterThanCurrentDateTime(this.value) === true
    ) {
      const error = {
        field: 'dateTimeInit',
        message: 'La fecha y hora dada es mayor a la fecha y hora actual',
      };
      this.setError(error);
    }
  }
}
