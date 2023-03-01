import { EventPublisherBase } from '../../../../../libs/sofka';
import { UserDomainEntityBase } from '../../entities';

export abstract class RegisteredUserEventPublisherBase extends EventPublisherBase<UserDomainEntityBase> {
  publish(): void {
    console.log('RegisteredUserEventPublisherBase: Method not implemented.');
  }
}
