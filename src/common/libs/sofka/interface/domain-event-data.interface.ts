/**
 * Interface that represents the data associated with who executed a domain event
 *
 * @export
 * @interface IDomainEventData
 */
export interface IDomainEventData {
  /**
   * Name of the domain in which the event occurred
   *
   * @type {string}
   * @memberof IDomainEventData
   */
  domain: string;

  /**
   * Name of the subdomain in which the event occurred, if applicable
   *
   * @type {string}
   * @memberof IDomainEventData
   */
  subdomain?: string;

  /**
   * Name of the context in which the event occurred
   *
   * @type {string}
   * @memberof IDomainEventData
   */
  context: string;

  /**
   * Name of the aggregate root associated with the event
   *
   * @type {string}
   * @memberof IDomainEventData
   */
  aggregate: string;

  /**
   * Name of the entity associated with the event, if applicable
   *
   * @type {string}
   * @memberof IDomainEventData
   */
  entity?: string;
}
