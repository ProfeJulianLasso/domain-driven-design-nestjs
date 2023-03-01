import { BadRequestException, Injectable } from '@nestjs/common';
import { ContactInformationPostgresEntity } from '../entities/contact-information.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { IRepository } from './base';

@Injectable()
export class ContactInformationRepository
  implements IRepository<ContactInformationPostgresEntity>
{
  constructor(
    @InjectRepository(ContactInformationPostgresEntity)
    private readonly repository: Repository<ContactInformationPostgresEntity>,
  ) {}

  async findAll(): Promise<ContactInformationPostgresEntity[]> {
    return await this.repository.findBy({ deletedAt: IsNull() });
  }

  async findById(
    contactInformationId: string,
  ): Promise<ContactInformationPostgresEntity> {
    const entity = await this.repository.findOneBy({
      contactInformationId,
      deletedAt: IsNull(),
    });
    if (entity) return entity;
    throw new BadRequestException(
      `El ID "${contactInformationId}" no existe en base de datos`,
    );
  }

  async create(
    entity: ContactInformationPostgresEntity,
  ): Promise<ContactInformationPostgresEntity | null> {
    return await this.repository.save(entity);
  }

  async update(
    contactInformationId: string,
    entity: ContactInformationPostgresEntity,
  ): Promise<ContactInformationPostgresEntity> {
    let entityToUpdate = await this.repository.findOneBy({
      contactInformationId,
      deletedAt: IsNull(),
    });
    if (entityToUpdate) {
      entityToUpdate = {
        ...entityToUpdate,
        ...entity,
      } as ContactInformationPostgresEntity;
      return await this.repository.save(entityToUpdate);
    }
    throw new BadRequestException(
      `El ID "${contactInformationId}" no existe en base de datos`,
    );
  }

  async delete(contactInformationId: string): Promise<boolean> {
    const entityToDelete = await this.repository.findOneBy({
      contactInformationId,
      deletedAt: IsNull(),
    });
    if (entityToDelete) {
      entityToDelete.deletedAt = Date.now();
      const response = await this.repository.save(entityToDelete);
      return response ? true : false;
    }
    throw new BadRequestException(
      `El ID "${contactInformationId}" no existe en base de datos`,
    );
  }
}
