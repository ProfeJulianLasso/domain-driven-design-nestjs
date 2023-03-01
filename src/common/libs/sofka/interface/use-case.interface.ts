/**
 * Interface representing a use case
 *
 * @export
 * @interface IUseCase
 * @template CommandType - Type of input payload
 * @template ResponseType - Type of response
 */
export interface IUseCase<CommandType, ResponseType> {
  /**
   * Executes the use case
   *
   * @param {CommandType} [command] - Input payload for the use case, if applicable
   * @return {ResponseType} - Output data type
   * @memberof IUseCase
   */
  execute(command?: CommandType): Promise<ResponseType>;
}
