import { Injectable } from '@nestjs/common';
import { ContactInformationPostgresEntity } from '../entities/contact-information.entity';
import { ContactInformationRepository } from '../repositories/contact-information.repository';
import { IContactInformationDomainService } from '../../../../../domain';

@Injectable()
export class ContactInformationPostgresService
  implements IContactInformationDomainService<ContactInformationPostgresEntity>
{
  constructor(
    private readonly contactInformationService: ContactInformationRepository,
  ) {}

  getContactInformation(
    contactInformationId: string,
  ): Promise<ContactInformationPostgresEntity | null> {
    return this.contactInformationService.findById(contactInformationId);
  }

  registerContactInformation(
    entity: ContactInformationPostgresEntity,
  ): Promise<ContactInformationPostgresEntity | null> {
    return this.contactInformationService.create(entity);
  }

  updateContactInformation(
    contactInformationId: string,
    entity: ContactInformationPostgresEntity,
  ): Promise<ContactInformationPostgresEntity | null> {
    return this.contactInformationService.update(contactInformationId, entity);
  }

  deleteContactInformation(contactInformationId: string): Promise<boolean> {
    return this.contactInformationService.delete(contactInformationId);
  }
}
