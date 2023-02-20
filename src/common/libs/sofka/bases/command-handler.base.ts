/* eslint-disable @typescript-eslint/ban-types */
import { ICommand, IDomainEventData, IUseCase } from '../interface';

/**
 * Abstract class for handling root aggregates,
 * used to handle domain commands and events
 *
 * @export
 * @abstract
 * @class AggregateRoot
 * @author Julian Lasso <julian.lasso@sofka.com.co>
 * @version 1.0.0
 * @license
 * Copyright (c) 2023 Sofka Technologies.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
export abstract class CommandHandlerBase {
  /**
   * Map of registered commands for this aggregate root
   *
   * @protected
   * @type {Map<string, any>}
   * @memberof AggregateRoot
   */
  protected _commands: Map<string, any>;

  /**
   * Creates an instance of AggregateRoot
   * @memberof AggregateRoot
   */
  constructor() {
    this._commands = new Map<string, any>();
  }

  /**
   * Registers a new command for this aggregate root
   *
   * @protected
   * @template P - Payload type
   * @template A - Answer type
   * @param {ICommand} command - Command to register
   * @memberof AggregateRoot
   */
  protected registerCommand(command: ICommand): void {
    this._commands.set(command.name, command);
  }

  /**
   * Executes a command for an aggregate root
   *
   * @template P - Payload type
   * @template A - Answer type
   * @param {string} command - Name of the command
   * @param {P} [payload] - Payload
   * @return {*}  {(A | undefined)} - Answer type A or undefined
   * @memberof AggregateRoot
   */
  executeCommand<P, A>(command: string, payload?: P): Promise<A | undefined> {
    if (this.hasCommand(command)) {
      const cmd = this.getCommand<P, A>(command);
      const answer = cmd.execute(payload);
      if (this.hasDomainEvent(command))
        this.executeDomainEvent(command, payload);
      return answer;
    }
    throw new Error(`The command "${command}" is not supported`);
  }

  /**
   * Executes a domain event for an aggregate root
   *
   * @private
   * @template P - Payload type
   * @param {string} command - Name of the command that will trigger the domain event
   * @param {P} [payload] - Payload
   * @memberof AggregateRoot
   */

  /**
   * Ejecuta el evento de un dominio
   *
   * @private
   * @template P - Tipo de dato del payload
   * @param {string} command - Nombre del comando
   * @param {P} [payload] - Parámetros a pasar el comando que se ejecuta
   * @memberof AggregateRoot
   */
  private executeDomainEvent<P>(command: string, payload?: P): void {
    const cmd = this._commands.get(command) as ICommand;
    if (cmd.domainEventDependencies && cmd.domainEventDependencies.length > 0)
      new (cmd.command as any)(...cmd.domainEventDependencies).execute(
        cmd.domainEventData,
        payload,
      );
    else new (cmd.command as any)().execute(cmd.domainEventData, payload);
  }

  /**
   * Checks if an aggregate root has a registered command with the given name
   *
   * @private
   * @param {string} command - Name of the command
   * @return {*}  {boolean} - True if the command is registered, false otherwise
   * @memberof AggregateRoot
   */
  private hasCommand(command: string): boolean {
    return this._commands.has(command);
  }

  private hasDomainEvent(command: string): boolean {
    if (this._commands.has(command) === false) return false;
    else if (
      this._commands.get(command)?.domainEvent &&
      this._commands.get(command)?.domainEventData
    )
      return true;
    return false;
  }

  /**
   * Gets the registered command with the given name
   *
   * @private
   * @template P - Payload type
   * @template A - Answer type
   * @param {string} command - Name of the command
   * @return {*}  {IUseCase<P, A>} - Instance of a use case
   * @memberof AggregateRoot
   */
  private getCommand<P, A>(command: string): IUseCase<P, A> {
    const cmd = this._commands.get(command) as ICommand;
    let response: Function;
    if (cmd.commandDependencies && cmd.commandDependencies.length > 0)
      response = new (cmd.command as any)(...cmd.commandDependencies);
    else response = new (cmd.command as any)();
    return response as unknown as IUseCase<P, A>;
  }

  /**
   * Gets the domain event data for the command with the given name
   *
   * @private
   * @param {string} command - Name of the command
   * @return {*}  {IDomainEventData} - Domain event data
   * @memberof AggregateRoot
   */
  private getDomainEventData(command: string): IDomainEventData {
    return this._commands.get(command).domainEventData as IDomainEventData;
  }
}
