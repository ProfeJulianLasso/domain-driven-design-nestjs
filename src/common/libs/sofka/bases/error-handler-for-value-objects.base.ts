import { IErrorObjectValue } from '../interface';

export abstract class ErrorHandlerForValueObjectsBase {
  private _errors: Array<IErrorObjectValue>;

  constructor() {
    this._errors = new Array<IErrorObjectValue>();
  }

  getErrors(): Array<IErrorObjectValue> {
    return this._errors;
  }

  setErrors(errors: Array<IErrorObjectValue>): void {
    this._errors = [...this._errors, ...errors];
  }

  hasErrors(): boolean {
    return this._errors.length > 0 ? true : false;
  }
}
