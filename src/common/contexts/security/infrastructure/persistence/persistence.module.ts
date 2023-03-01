import { Module } from '@nestjs/common';
import { PostgresModule } from './databases/postgres';
import {
  ContactInformationService,
  RoleService,
  UserService,
} from './services';

@Module({
  imports: [PostgresModule],
  providers: [UserService, RoleService, ContactInformationService],
  exports: [UserService, RoleService, ContactInformationService],
})
export class PersistenceModule {}
