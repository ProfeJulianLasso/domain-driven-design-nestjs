import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'node:path';
import {
  ContactInformationPostgresEntity,
  RolePostgresEntity,
  UserPostgresEntity,
} from '../entities';

config({
  path: join(
    process.cwd(),
    'environments',
    `.env.${process.env.SCOPE?.trimEnd()}`,
  ),
});

const TypeORMPostgresConfigMigrations: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    ContactInformationPostgresEntity,
    RolePostgresEntity,
    UserPostgresEntity,
  ],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  migrations: ['./src/migrations/**/*.{.ts,.js}'],
  migrationsTableName: 'migrations',
};

const datasource = new DataSource(TypeORMPostgresConfigMigrations);
export default datasource;
