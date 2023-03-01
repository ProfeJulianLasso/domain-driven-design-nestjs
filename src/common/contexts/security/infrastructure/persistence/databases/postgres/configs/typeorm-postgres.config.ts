import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'node:path';
import { ContactInformationPostgresEntity } from '../entities/contact-information.entity';
import { RolePostgresEntity } from '../entities/role.entity';
import { UserPostgresEntity } from '../entities/user.entity';

config({
  path: join(
    process.cwd(),
    'environments',
    `.env.${process.env.SCOPE?.trimEnd()}`,
  ),
});

export const TypeORMPostgresConfig: DataSourceOptions = {
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
  synchronize: true,
  // migrationsRun: true,
  logging: true,
  // migrations: ['./src/migrations/**/*.{.ts,.js}'],
  // migrationsTableName: 'migrations',
};

export default TypeORMPostgresConfig;
