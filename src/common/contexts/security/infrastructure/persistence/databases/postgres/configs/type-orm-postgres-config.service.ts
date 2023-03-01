import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeORMPostgresConfig } from './typeorm-postgres.config';

@Injectable()
export class TypeOrmPostgresConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return TypeORMPostgresConfig;
  }
}
