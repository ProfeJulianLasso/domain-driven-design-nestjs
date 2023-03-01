import { Column, Entity, Index, ManyToMany } from 'typeorm';
import { UserPostgresEntity } from './user.entity';
import { RoleDomainEntityBase } from '../../../../../domain/entities/role.domain-entity';

@Index('role_name_index', ['name', 'createdAt'], { unique: true })
@Index('role_state_index', ['state'], {})
@Index('role_pk', ['roleId'], { unique: true })
@Entity('role', { schema: 'public' })
export class RolePostgresEntity extends RoleDomainEntityBase {
  @Column('uuid', {
    primary: true,
    name: 'rol_id',
    default: () => 'gen_random_uuid()',
  })
  roleId?: string;

  @Column('character varying', {
    name: 'rol_name',
    length: 100,
  })
  name: string;

  @Column('character varying', {
    name: 'rol_description',
    length: 2048,
  })
  description: string;

  @Column('boolean', {
    name: 'rol_state',
    default: () => 'true',
  })
  state: boolean;

  @Column('timestamp with time zone', {
    name: 'rol_created_at',
    default: () => 'now()',
  })
  createdAt: number | Date;

  @Column('timestamp with time zone', {
    name: 'rol_updated_at',
    nullable: true,
  })
  updatedAt?: number | Date;

  @Column('timestamp with time zone', {
    name: 'rol_deleted_at',
    nullable: true,
  })
  deletedAt?: number | Date;

  @ManyToMany(() => UserPostgresEntity, (user) => user.roles, {
    cascade: ['insert', 'update'],
  })
  users: UserPostgresEntity[];
}
