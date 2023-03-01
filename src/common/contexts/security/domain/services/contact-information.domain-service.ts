import { ContactInformationDomainEntityBase } from '../entities';

export interface IContactInformationDomainService<
  T extends ContactInformationDomainEntityBase = ContactInformationDomainEntityBase,
> {
  getContactInformation(contactInformationId: string): Promise<T | null>;
  registerContactInformation(entity: T): Promise<T | null>;
  updateContactInformation(
    contactInformationId: string,
    entity: T,
  ): Promise<T | null>;
  deleteContactInformation(contactInformationId: string): Promise<boolean>;
}
