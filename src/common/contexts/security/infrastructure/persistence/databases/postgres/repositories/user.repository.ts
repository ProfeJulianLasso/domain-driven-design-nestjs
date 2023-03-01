import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { UserPostgresEntity } from '../entities/user.entity';
import { IRepository } from './base';

@Injectable()
export class UserRepository implements IRepository<UserPostgresEntity> {
  constructor(
    @InjectRepository(UserPostgresEntity)
    protected readonly repository: Repository<UserPostgresEntity>,
  ) {}

  async findAll(): Promise<UserPostgresEntity[]> {
    return await this.repository.findBy({ deletedAt: IsNull() });
  }

  async findById(userId: string): Promise<UserPostgresEntity> {
    const entity = await this.repository.findOneBy({
      userId,
      deletedAt: IsNull(),
    });
    if (entity) return entity;
    throw new BadRequestException(
      `El ID "${userId}" no existe en base de datos`,
    );
  }

  async create(entity: UserPostgresEntity): Promise<UserPostgresEntity | null> {
    return await this.repository.save(entity);
  }

  async update(
    userId: string,
    entity: UserPostgresEntity,
  ): Promise<UserPostgresEntity> {
    let entityToUpdate = await this.repository.findOneBy({
      userId,
      deletedAt: IsNull(),
    });
    if (entityToUpdate) {
      entityToUpdate = {
        ...entityToUpdate,
        ...entity,
      } as UserPostgresEntity;
      return await this.repository.save(entityToUpdate);
    }
    throw new BadRequestException(
      `El ID "${userId}" no existe en base de datos`,
    );
  }

  async delete(userId: string): Promise<boolean> {
    const entityToDelete = await this.repository.findOneBy({
      userId,
      deletedAt: IsNull(),
    });
    if (entityToDelete) {
      entityToDelete.deletedAt = Date.now();
      const response = await this.repository.save(entityToDelete);
      return response ? true : false;
    }
    throw new BadRequestException(
      `El ID "${userId}" no existe en base de datos`,
    );
  }
}
