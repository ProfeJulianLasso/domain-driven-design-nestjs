import { UserPostgresEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { IUserDomainService } from '../../../../../domain/services';

@Injectable()
export class UserPostgresService
  implements IUserDomainService<UserPostgresEntity>
{
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(userId: string): Promise<UserPostgresEntity | null> {
    return await this.userRepository.findById(userId);
  }

  async registerUser(
    entity: UserPostgresEntity,
  ): Promise<UserPostgresEntity | null> {
    return await this.userRepository.create(entity);
  }

  async updateUser(
    userId: string,
    entity: UserPostgresEntity,
  ): Promise<UserPostgresEntity> {
    return await this.userRepository.update(userId, entity);
  }

  async deleteUser(userId: string): Promise<boolean> {
    return await this.userRepository.delete(userId);
  }
}
