import { ObjectValueBase } from '../../../../../libs/sofka/bases';
import { IsDateTimeGraterThanCurrentDateTime } from '../../../../../validations';

export class DateTimeEndObjectValue extends ObjectValueBase<number> {
  validateData(): void {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (
      this.value &&
      IsDateTimeGraterThanCurrentDateTime(this.value) === true
    ) {
      const error = {
        field: 'dateTimeEnd',
        message: 'La fecha y hora dada es mayor a la fecha y hora actual',
      };
      this.setError(error);
    }
  }
}
