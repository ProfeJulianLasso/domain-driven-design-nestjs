/**
 * Interface representing a use case
 *
 * @export
 * @interface IUseCase
 * @template P - Type of input payload
 * @template A - Type of response
 */
export interface IUseCase<P, A> {
  /**
   * Executes the use case
   *
   * @param {P} [payload] - Input payload for the use case, if applicable
   * @return {*}  {A} - Output data type
   * @memberof IUseCase
   */
  execute(payload?: P): Promise<A>;

  executeValidations(payload?: P): any;
}
