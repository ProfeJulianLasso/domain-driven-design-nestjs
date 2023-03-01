import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import {
  ValueObjectExceptionFilter,
  QueryFailedErrorExceptionFilter,
} from './common';
import { SecurityController } from './controllers';
import { MessagingModule } from './messaging/messaging.module';
import { PersistenceModule } from './persistence';

@Module({
  imports: [PersistenceModule, MessagingModule],
  controllers: [SecurityController],
  providers: [
    { provide: APP_FILTER, useClass: ValueObjectExceptionFilter },
    { provide: APP_FILTER, useClass: QueryFailedErrorExceptionFilter },
  ],
  exports: [],
})
export class SecurityModule {}
