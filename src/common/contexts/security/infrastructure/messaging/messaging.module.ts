import { Module } from '@nestjs/common';
import { RegisteredUserEventPublisher } from './publisher/registered-user.event-publisher';

@Module({
  providers: [RegisteredUserEventPublisher],
  exports: [RegisteredUserEventPublisher],
})
export class MessagingModule {}
