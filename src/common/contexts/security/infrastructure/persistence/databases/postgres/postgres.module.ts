import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmPostgresConfigService } from './configs';
import { ContactInformationPostgresEntity } from './entities/contact-information.entity';
import { RolePostgresEntity } from './entities/role.entity';
import { UserPostgresEntity } from './entities/user.entity';
import {
  ContactInformationRepository,
  RoleRepository,
  UserRepository,
} from './repositories';
import {
  ContactInformationPostgresService,
  RolePostgresService,
  UserPostgresService,
} from './services';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmPostgresConfigService,
    }),
    TypeOrmModule.forFeature([
      ContactInformationPostgresEntity,
      RolePostgresEntity,
      UserPostgresEntity,
    ]),
  ],
  controllers: [],
  providers: [
    ContactInformationRepository,
    RoleRepository,
    UserRepository,
    ContactInformationPostgresService,
    RolePostgresService,
    UserPostgresService,
  ],
  exports: [
    ContactInformationRepository,
    RoleRepository,
    UserRepository,
    ContactInformationPostgresService,
    RolePostgresService,
    UserPostgresService,
  ],
})
export class PostgresModule {}
