import { EventPublisherBase } from '../../../../../libs/sofka';
export class DeletedUserEventPublisher extends EventPublisherBase<boolean> {
  publish(): void {
    console.log('DeletedUserEventPublisher: Method not implemented.');
  }
}
