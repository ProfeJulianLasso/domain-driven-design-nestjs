import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { RolePostgresEntity } from './role.entity';
import { ContactInformationPostgresEntity } from './contact-information.entity';
import { UserDomainEntityBase } from '../../../../../domain/entities';

@Index('user_pk', ['userId'], { unique: true })
@Entity('user', { schema: 'public' })
export class UserPostgresEntity extends UserDomainEntityBase {
  @Column('uuid', {
    primary: true,
    name: 'usr_id',
    default: () => 'gen_random_uuid()',
  })
  userId?: string;

  @Column('boolean', {
    name: 'usr_verified_email',
    default: () => 'false',
  })
  verifiedEmail: boolean;

  @Column('timestamp with time zone', {
    name: 'usr_created_at',
    default: () => 'now()',
  })
  createdAt: number | Date;

  @Column('timestamp with time zone', {
    name: 'usr_updated_at',
    nullable: true,
  })
  updatedAt?: number | Date;

  @Column('timestamp with time zone', {
    name: 'usr_deleted_at',
    nullable: true,
  })
  deletedAt?: number | Date;

  @ManyToMany(() => RolePostgresEntity, (role) => role.users, {
    cascade: ['insert', 'update'],
  })
  roles: RolePostgresEntity[];

  @OneToOne(
    () => ContactInformationPostgresEntity,
    (contactInformation) => contactInformation.user,
    {
      cascade: ['insert', 'update'],
    },
  )
  @JoinColumn()
  contactInformation: ContactInformationPostgresEntity;
}
