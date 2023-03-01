import { IErrorValueObject } from '../interface';

export class ValueObjectException extends Error {
  private _errors: Array<IErrorValueObject>;

  constructor(message: string, errors: Array<IErrorValueObject>) {
    super(message);
    this._errors = errors;
  }

  get errors(): Array<IErrorValueObject> {
    return this._errors;
  }
}
