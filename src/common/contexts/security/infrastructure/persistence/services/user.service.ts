import { Injectable } from '@nestjs/common';
import { UserPostgresService } from '../databases/postgres/services';

@Injectable()
export class UserService extends UserPostgresService {}
