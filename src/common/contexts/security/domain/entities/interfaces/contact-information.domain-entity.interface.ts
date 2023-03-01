import {
  ContactInformationIdValueObject,
  DocumentValueObject,
  DocumentTypeValueObject,
  EmailValueObject,
  HomeAddressValueObject,
  LastnameValueObject,
  NameValueObject,
  PhoneValueObject,
} from '../../value-objects/contact-information';

export interface IContactInformationDomainEntity {
  contactInformationId?: string | ContactInformationIdValueObject;
  documentType: string | DocumentTypeValueObject;
  document: string | DocumentValueObject;
  name: string | NameValueObject;
  lastname: string | LastnameValueObject;
  email: string | EmailValueObject;
  phone: string | PhoneValueObject;
  homeAddress: string | HomeAddressValueObject;
  createdAt?: number | Date;
  updatedAt?: number | Date;
  deletedAt?: number | Date;
}
