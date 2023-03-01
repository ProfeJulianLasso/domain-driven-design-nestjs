export interface IAddLogCommand {
  eventId?: string;
  context: string;
  aggregateRoot: string;
  eventName: string;
  payload?: string;
  dateTime: number;
}
