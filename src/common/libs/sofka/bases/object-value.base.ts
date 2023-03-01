import { IErrorValueObject } from '../interface';

/**
 * Abstract class for representing an object value
 *
 * @export
 * @abstract
 * @class ValueObjectBase
 * @template Type Type of value represented by the value object
 */
export abstract class ValueObjectBase<Type> {
  private _errors: Array<IErrorValueObject>;
  private _value: Type;

  /**
   * Creates an instance of ValueObjectBase
   *
   * @param {Type} [value] Initial value of the object value
   * @memberof ValueObjectBase
   */
  constructor(value?: Type) {
    this._errors = new Array<IErrorValueObject>();
    if (value) this._value = value;
    this.validateData();
  }

  /**
   * Returns the current value of the object value
   *
   * @type {Type}
   * @memberof ValueObjectBase
   */
  get value(): Type {
    return this._value;
  }

  /**
   * Sets the value for the value object, resets the error stack,
   * and validates the new value
   *
   * @memberof ValueObjectBase
   */
  set value(value: Type) {
    this._value = value;
    this.restartErrors();
    this.validateData();
  }

  /**
   * Validates the data of the value object.
   * This method must be implemented in the derived classes
   *
   * @abstract
   * @memberof ValueObjectBase
   */
  abstract validateData(): void;

  /**
   * Returns true if there are validation errors, false otherwise
   *
   * @return {boolean} True if there are validation errors, false otherwise
   * @memberof ValueObjectBase
   */
  hasErrors(): boolean {
    return this._errors.length > 0 ? true : false;
  }

  /**
   * Returns an array of validation errors for the value object
   *
   * @return {Array<IErrorValueObject>} Array of validation errors for the value object
   * @memberof ValueObjectBase
   */
  getErrors(): Array<IErrorValueObject> {
    return this._errors;
  }

  /**
   * Sets a validation error for the value object
   *
   * @protected
   * @param {IErrorValueObject} error Validation error to set
   * @memberof ValueObjectBase
   */
  protected setError(error: IErrorValueObject): void {
    this._errors.push(error);
  }

  /**
   * Clears all validation errors of the value object
   *
   * @private
   * @memberof ValueObjectBase
   */
  private restartErrors(): void {
    this._errors = new Array<IErrorValueObject>();
  }

  /**
   * Returns the primitive value of the specified object
   *
   * @return {Type} Primitive value of the specified object
   * @memberof ValueObjectBase
   */
  valueOf(): Type {
    return this._value;
  }
}
