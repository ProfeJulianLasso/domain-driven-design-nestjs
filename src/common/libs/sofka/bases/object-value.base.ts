import { IErrorObjectValue } from '../interface/error-object-value.interface';

export abstract class ObjectValueBase<T> {
  private _errors: Array<IErrorObjectValue>;
  private _value: T;

  constructor(value?: T) {
    this._errors = new Array<IErrorObjectValue>();
    if (value) this._value = value;
    this.validateData();
  }

  get value(): T {
    return this._value;
  }

  set value(value: T) {
    this._value = value;
    this.restartErrors();
    this.validateData();
  }

  abstract validateData(): void;

  hasErrors(): boolean {
    return this._errors.length > 0 ? true : false;
  }

  getErrors(): Array<IErrorObjectValue> {
    return this._errors;
  }

  protected setError(error: IErrorObjectValue): void {
    this._errors.push(error);
  }

  private restartErrors(): void {
    this._errors = new Array<IErrorObjectValue>();
  }

  toString(): T {
    return this._value;
  }
}
