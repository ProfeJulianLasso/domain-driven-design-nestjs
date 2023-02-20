import { IDomainEventData } from './domain-event-data.interface';

/**
 * Interface representing a domain event
 *
 * @export
 * @interface IDomainEvent
 * @template P - Type of the payload
 */
export interface IDomainEvent<P> {
  /**
   * Executes the domain event
   *
   * @param {IDomainEventData} info - Information associated with the event
   * @param {P} [payload] - Payload associated with the event, if applicable
   * @memberof IDomainEvent
   */
  execute(info: IDomainEventData, payload?: P): void;
}
