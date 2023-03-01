import { Injectable } from '@nestjs/common';
import { RolePostgresService } from '../databases/postgres/services';

@Injectable()
export class RoleService extends RolePostgresService {}
