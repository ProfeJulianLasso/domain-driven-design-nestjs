import { EventPublisherBase } from '../../../../../libs/sofka';
import { RoleDomainEntityBase } from '../../entities';

export class GotUserRolesEventPublisher extends EventPublisherBase<RoleDomainEntityBase> {
  publish(): void {
    console.log('GotUserRolesEventPublisher: Method not implemented.');
  }
}
