import { BadRequestException, Injectable } from '@nestjs/common';
import { RolePostgresEntity } from '../entities';
import { UserPostgresEntity } from '../entities/user.entity';
import { RoleRepository } from '../repositories/role.repository';
import { IRoleDomainService } from '../../../../../domain/services';

@Injectable()
export class RolePostgresService
  implements IRoleDomainService<RolePostgresEntity>
{
  constructor(private readonly roleRepository: RoleRepository) {}

  async getUserRoles(userId: string): Promise<RolePostgresEntity[]> {
    return await this.roleRepository.findRoleByUserId(userId);
  }

  async assignRoleToUser(userId: string, roleId: string): Promise<boolean> {
    const role = await this.roleRepository.findById(roleId);
    if (role === null)
      throw new BadRequestException(
        `El Rol con ID "${roleId}" no existe en base de datos`,
      );
    role.users.push(new UserPostgresEntity({ userId }));
    return (await this.roleRepository.update(roleId, role)) ? true : false;
  }

  async checkUserRole(userId: string, roleId: string): Promise<boolean> {
    const data = await this.getUserRoles(userId);
    return data.length > 0 && data.find((item) => item.roleId === roleId)
      ? true
      : false;
  }
}
