import { Column, Entity, Index, OneToOne } from 'typeorm';
import { UserPostgresEntity } from './user.entity';
import { ContactInformationDomainEntityBase } from '../../../../../domain/entities';

@Index(
  'contact_information_document_type_document_index',
  ['documentType', 'document', 'deletedAt'],
  { unique: true },
)
@Index('contact_information_email_index', ['email', 'deletedAt'], {
  unique: true,
})
@Index('contact_information_phone_index', ['phone', 'deletedAt'], {
  unique: true,
})
@Index('contact_information_pk', ['contactInformationId'], { unique: true })
@Entity('contact_information', { schema: 'public' })
export class ContactInformationPostgresEntity extends ContactInformationDomainEntityBase {
  @Column('uuid', {
    primary: true,
    name: 'continfo_id',
    default: () => 'gen_random_uuid()',
  })
  contactInformationId?: string;

  @Column('character varying', {
    name: 'continfo_document_type',
    length: 2,
  })
  documentType: string;

  @Column('character varying', {
    name: 'continfo_document',
    length: 10,
  })
  document: string;

  @Column('character varying', {
    name: 'continfo_name',
    length: 100,
  })
  name: string;

  @Column('character varying', {
    name: 'continfo_lastname',
    length: 100,
  })
  lastname: string;

  @Column('character varying', {
    name: 'continfo_email',
    length: 100,
  })
  email: string;

  @Column('character varying', {
    name: 'continfo_phone',
    length: 10,
  })
  phone: string;

  @Column('character varying', {
    name: 'continfo_home_address',
    length: 200,
  })
  homeAddress: string;

  @Column('timestamp with time zone', {
    name: 'continfo_created_at',
    default: () => 'now()',
  })
  createdAt: number | Date;

  @Column('timestamp with time zone', {
    name: 'continfo_updated_at',
    nullable: true,
  })
  updatedAt?: number | Date;

  @Column('timestamp with time zone', {
    name: 'continfo_deleted_at',
    nullable: true,
  })
  deletedAt?: number | Date;

  @OneToOne(() => UserPostgresEntity, (user) => user.contactInformation)
  user: UserPostgresEntity;
}
