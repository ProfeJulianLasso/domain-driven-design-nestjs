import { IErrorValueObject } from '../interface';

export abstract class ValueObjectErrorHandler {
  private _errors: Array<IErrorValueObject>;

  constructor() {
    this._errors = new Array<IErrorValueObject>();
  }

  getErrors(): Array<IErrorValueObject> {
    return this._errors;
  }

  setErrors(errors: Array<IErrorValueObject>): void {
    this._errors = [...this._errors, ...errors];
  }

  hasErrors(): boolean {
    return this._errors.length > 0 ? true : false;
  }
}
