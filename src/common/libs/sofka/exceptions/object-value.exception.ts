import { IErrorObjectValue } from '../interface';

export class ObjectValueException extends Error {
  private _errors: Array<IErrorObjectValue>;

  constructor(message: string, errors: Array<IErrorObjectValue>) {
    super(message);
    this._errors = errors;
  }

  get errors(): Array<IErrorObjectValue> {
    return this.errors;
  }
}
