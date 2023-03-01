import { ValueObjectBase } from '../../../../../../libs/sofka';
import { IsDateTimeGraterThanCurrentDateTime } from '../../../../../../validations';

export class DateTimeEndValueObject extends ValueObjectBase<number> {
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
