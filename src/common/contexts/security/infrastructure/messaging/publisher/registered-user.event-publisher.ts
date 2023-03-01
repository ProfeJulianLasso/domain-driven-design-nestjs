import { Injectable } from '@nestjs/common';
import { RegisteredUserEventPublisherBase } from '../../../domain';

@Injectable()
export class RegisteredUserEventPublisher extends RegisteredUserEventPublisherBase {
  publish(): void {
    super.publish();
  }
}
