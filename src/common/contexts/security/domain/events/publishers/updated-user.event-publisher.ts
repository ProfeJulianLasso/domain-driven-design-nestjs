import { EventPublisherBase } from '../../../../../libs/sofka';
import { UserDomainEntityBase } from '../../entities';

export class UpdatedUserEventPublisher extends EventPublisherBase<UserDomainEntityBase> {
  publish(): void {
    console.log('UpdatedUserEventPublisher: Method not implemented.');
  }
}
