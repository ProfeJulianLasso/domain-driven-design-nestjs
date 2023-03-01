import { Injectable } from '@nestjs/common';
import { ContactInformationPostgresService } from '../databases/postgres/services';

@Injectable()
export class ContactInformationService extends ContactInformationPostgresService {}
