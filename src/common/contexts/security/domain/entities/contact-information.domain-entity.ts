import { v4 as uuidv4 } from 'uuid';
import {
  ContactInformationIdValueObject,
  DocumentValueObject,
  DocumentTypeValueObject,
  EmailValueObject,
  HomeAddressValueObject,
  LastnameValueObject,
  NameValueObject,
  PhoneValueObject,
} from '../value-objects/contact-information';
import { IContactInformationDomainEntity } from './interfaces';

export class ContactInformationDomainEntityBase
  implements IContactInformationDomainEntity
{
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

  constructor(data?: IContactInformationDomainEntity) {
    if (data?.contactInformationId)
      this.contactInformationId = data.contactInformationId;
    else this.contactInformationId = uuidv4();

    if (data?.documentType) this.documentType = data.documentType;

    if (data?.document) this.document = data.document;

    if (data?.name) this.name = data.name;

    if (data?.lastname) this.lastname = data.lastname;

    if (data?.email) this.email = data.email;

    if (data?.phone) this.phone = data.phone;

    if (data?.homeAddress) this.homeAddress = data.homeAddress;

    this.createdAt = new Date();
  }
}
