import { EventPublisherBase } from '../../../../../libs/sofka';
import { UserDomainEntityBase } from '../../entities';

export class GotUserEventPublisher extends EventPublisherBase<UserDomainEntityBase> {
  publish(): void {
    console.log('GotUserEventPublisher: Method not implemented.');
  }
}
