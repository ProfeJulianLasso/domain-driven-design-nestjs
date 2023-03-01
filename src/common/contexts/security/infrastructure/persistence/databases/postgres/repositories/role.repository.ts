import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { RolePostgresEntity } from '../entities';
import { IRepository } from './base/repository.base';

@Injectable()
export class RoleRepository implements IRepository<RolePostgresEntity> {
  constructor(
    @InjectRepository(RolePostgresEntity)
    protected readonly repository: Repository<RolePostgresEntity>,
  ) {}

  async findAll(): Promise<RolePostgresEntity[]> {
    return await this.repository.findBy({ deletedAt: IsNull() });
  }

  async findById(roleId: string): Promise<RolePostgresEntity> {
    const entity = await this.repository.findOneBy({
      roleId,
      deletedAt: IsNull(),
    });
    if (entity) return entity;
    throw new BadRequestException(
      `El ID "${roleId}" no existe en base de datos`,
    );
  }

  async create(entity: RolePostgresEntity): Promise<RolePostgresEntity | null> {
    return await this.repository.save(entity);
  }

  async update(
    roleId: string,
    entity: RolePostgresEntity,
  ): Promise<RolePostgresEntity> {
    let entityToUpdate = await this.repository.findOneBy({
      roleId,
      deletedAt: IsNull(),
    });
    if (entityToUpdate) {
      entityToUpdate = {
        ...entityToUpdate,
        ...entity,
      } as RolePostgresEntity;
      return await this.repository.save(entityToUpdate);
    }
    throw new BadRequestException(
      `El ID "${roleId}" no existe en base de datos`,
    );
  }

  async delete(roleId: string): Promise<boolean> {
    const entityToDelete = await this.repository.findOneBy({
      roleId,
      deletedAt: IsNull(),
    });
    if (entityToDelete) {
      entityToDelete.deletedAt = Date.now();
      const response = await this.repository.save(entityToDelete);
      return response ? true : false;
    }
    throw new BadRequestException(
      `El ID "${roleId}" no existe en base de datos`,
    );
  }

  async findRoleByUserId(userId: string): Promise<RolePostgresEntity[]> {
    return await this.repository.find({
      relations: { users: true },
      where: { deletedAt: IsNull(), users: { userId, deletedAt: IsNull() } },
    });
  }
}
