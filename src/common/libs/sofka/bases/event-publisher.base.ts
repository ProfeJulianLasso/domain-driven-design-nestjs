/**
 * Abstract class representing an event publisher
 *
 * @export
 * @abstract
 * @class EventPublisherBase
 * @template Response Type of response published
 */
export abstract class EventPublisherBase<Response> {
  /**
   * Response to the event publisher's request
   *
   * @private
   * @type {(Response | Response[] | null)}
   * @memberof EventPublisherBase
   */
  private _response: Response | Response[] | null;

  /**
   * Creates an instance of EventPublisherBase
   *
   * @param {(Response | Response[] | null)} response Response to the event publisher's request
   * @memberof EventPublisherBase
   */
  constructor(response: Response | Response[] | null) {
    this._response = response;
  }

  /**
   * Gets the response to the event publisher's request
   *
   * @type {(Response | Response[] | null)}
   * @memberof EventPublisherBase
   */
  get response(): Response | Response[] | null {
    return this._response;
  }

  /**
   * Sets the response to the event publisher's request
   *
   * @memberof EventPublisherBase
   */
  set response(value: Response | Response[] | null) {
    this._response = value;
  }

  /**
   * Publishes the event to its subscribers
   *
   * @abstract
   * @memberof EventPublisherBase
   */
  abstract publish(): void;
}
