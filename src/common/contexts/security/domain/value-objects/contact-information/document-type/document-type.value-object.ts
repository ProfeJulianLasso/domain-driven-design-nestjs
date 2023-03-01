import { ValueObjectBase } from '../../../../../../libs/sofka';
import { IsInTheGroup } from '../../../../../../validations';
import { IsEmpty } from '../../../../../../validations/is-empty.validation';

export class DocumentTypeValueObject extends ValueObjectBase<string> {
  validateData() {
    this.validateStructure();
  }

  private validateStructure(): void {
    if (IsEmpty(this.value) === true) {
      const error = {
        field: 'documentType',
        message: 'El valor de "documentType" es requerido',
      };
      this.setError(error);
    } else if (this.value && IsInTheGroup(this.value, ['CC', 'CE']) === false) {
      const error = {
        field: 'documentType',
        message: 'El valor de "documentType" no es un valor correcto',
      };
      this.setError(error);
    }
  }
}
