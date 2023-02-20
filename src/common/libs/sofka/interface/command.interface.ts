/* eslint-disable @typescript-eslint/ban-types */

import { IDomainEventData } from '.';

/**
 * Interface representing a command
 *
 * @export
 * @interface ICommand
 */
export interface ICommand {
  /**
   * Name of the command
   *
   * @type {string}
   * @memberof ICommand
   */
  name: string;

  /**
   * Use case associated with the command
   *
   * @type {Function}
   * @memberof ICommand
   */
  command: Function; // IUseCase<P, A>;

  commandDependencies?: Array<any>;

  /**
   * Domain event associated with the command
   *
   * @type {Function}
   * @memberof ICommand
   */
  domainEvent?: Function;

  domainEventDependencies?: Array<any>;

  /**
   * Data associated with who executed the domain event
   *
   * @type {IDomainEventData}
   * @memberof ICommand
   */
  domainEventData?: IDomainEventData;
}
