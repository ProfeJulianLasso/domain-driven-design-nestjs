import { ValueObjectBase } from '../../../../../../libs/sofka';
import { IsDateTimeGraterThanCurrentDateTime } from '../../../../../../validations';

export class DateTimeInitValueObject extends ValueObjectBase<number> {
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
