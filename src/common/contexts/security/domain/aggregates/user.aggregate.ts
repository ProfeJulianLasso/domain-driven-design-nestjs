import {
  ContactInformationDomainEntityBase,
  RoleDomainEntityBase,
  UserDomainEntityBase,
} from '../entities';
import { AggregateRootException } from '../../../../libs/sofka';
import {
  DeletedUserEventPublisher,
  GotUserEventPublisher,
  GotUserRolesEventPublisher,
  RegisteredUserEventPublisherBase,
  UpdatedUserEventPublisher,
} from '../events';
import {
  IContactInformationDomainService,
  IRoleDomainService,
  IUserDomainService,
} from '../services';

export class UserAggregateRoot
  implements
    IUserDomainService,
    IRoleDomainService,
    IContactInformationDomainService
{
  private readonly userService?: IUserDomainService;
  private readonly roleService?: IRoleDomainService;
  private readonly contactInformationService?: IContactInformationDomainService;
  private readonly gotUserEventPublisher?: GotUserEventPublisher;
  private readonly registeredUserEventPublisher?: RegisteredUserEventPublisherBase;
  private readonly updatedUserEventPublisher?: UpdatedUserEventPublisher;
  private readonly deletedUserEventPublisher?: DeletedUserEventPublisher;
  private readonly gotUserRolesEventPublisher?: GotUserRolesEventPublisher;

  constructor({
    userService,
    roleService,
    contactInformationService,
    gotUserEventPublisher,
    registeredUserEventPublisher,
    deletedUserEventPublisher,
    gotUserRolesEventPublisher,
  }: {
    userService?: IUserDomainService;
    roleService?: IRoleDomainService;
    contactInformationService?: IContactInformationDomainService;
    gotUserEventPublisher?: GotUserEventPublisher;
    registeredUserEventPublisher?: RegisteredUserEventPublisherBase;
    deletedUserEventPublisher?: DeletedUserEventPublisher;
    gotUserRolesEventPublisher?: GotUserRolesEventPublisher;
  }) {
    this.userService = userService;
    this.roleService = roleService;
    this.contactInformationService = contactInformationService;
    this.gotUserEventPublisher = gotUserEventPublisher;
    this.registeredUserEventPublisher = registeredUserEventPublisher;
    this.deletedUserEventPublisher = deletedUserEventPublisher;
    this.gotUserRolesEventPublisher = gotUserRolesEventPublisher;
  }

  async getUser(userId: string): Promise<UserDomainEntityBase | null> {
    if (this.userService && this.gotUserEventPublisher) {
      const result = await this.userService.getUser(userId);
      this.gotUserEventPublisher.response = result;
      this.gotUserEventPublisher.publish();
      return this.gotUserEventPublisher.response;
    }
    throw new AggregateRootException(
      'UserAggregateRoot "UserService" y/o "GotUserEventPublisher" no están definidos',
    );
  }

  async registerUser(
    entity: UserDomainEntityBase,
  ): Promise<UserDomainEntityBase | null> {
    if (this.userService && this.registeredUserEventPublisher) {
      const result = await this.userService.registerUser(entity);
      this.registeredUserEventPublisher.response = result;
      this.registeredUserEventPublisher.publish();
      return this.registeredUserEventPublisher.response;
    }
    throw new AggregateRootException(
      'UserAggregateRoot "UserService" y/o "RegisteredUserEventPublisher" no están definidos',
    );
  }

  async updateUser(
    userId: string,
    entity: UserDomainEntityBase,
  ): Promise<UserDomainEntityBase> {
    this.checkUserService();
    this.checkEventPublisher();
    if (this.updatedUserEventPublisher && this.userService) {
      const result = await this.userService.updateUser(userId, entity);
      this.updatedUserEventPublisher.response = result;
      this.updatedUserEventPublisher.publish();
      return this.updatedUserEventPublisher.response;
    }
    throw new Error("UserAggregateRoot 'UserService' no está definido");
  }

  private checkUserService(): void {
    if (!this.userService)
      throw new AggregateRootException(
        'UserAggregateRoot "UserService" no está definido',
      );
  }

  private checkEventPublisher(): boolean {
    if (!this.updatedUserEventPublisher)
      throw new AggregateRootException(
        'UserAggregateRoot "UpdatedUserEventPublisher" no está definido',
      );
    return true;
  }

  async deleteUser(userId: string): Promise<boolean> {
    if (this.userService && this.deletedUserEventPublisher) {
      const result = await this.userService.deleteUser(userId);
      this.deletedUserEventPublisher.response = result;
      this.deletedUserEventPublisher.publish();
      return this.deletedUserEventPublisher.response;
    }
    throw new AggregateRootException(
      'UserAggregateRoot "UserService" y/o "DeletedUserEventPublisher" no están definidos',
    );
  }

  async getUserRoles(userId: string): Promise<RoleDomainEntityBase[]> {
    if (this.roleService && this.gotUserRolesEventPublisher) {
      const result = await this.roleService.getUserRoles(userId);
      this.gotUserRolesEventPublisher.response = result;
      this.gotUserRolesEventPublisher.publish();
      return this.gotUserRolesEventPublisher.response;
    }
    throw new AggregateRootException(
      'UserAggregateRoot "UserService" y/o "DeletedUserEventPublisher" no están definidos',
    );
  }

  assignRoleToUser(userId: string, roleId: string): Promise<boolean> {
    // return this.roleService.assignRoleToUser(userId, roleId);
    throw new AggregateRootException('Method not implemented.');
  }

  checkUserRole(userId: string, roleId: string): Promise<boolean> {
    // return this.roleService.checkUserRole(userId, roleId);
    throw new AggregateRootException('Method not implemented.');
  }

  async getContactInformation(
    userId: string,
  ): Promise<ContactInformationDomainEntityBase | null> {
    // return await this.contactInformationService.getContactInformation(userId);
    throw new AggregateRootException('Method not implemented.');
  }

  async registerContactInformation(
    entity: ContactInformationDomainEntityBase,
  ): Promise<ContactInformationDomainEntityBase | null> {
    // return await this.contactInformationService.registerContactInformation(
    //   entity,
    // );
    throw new AggregateRootException('Method not implemented.');
  }

  async updateContactInformation(
    userId: string,
    entity: ContactInformationDomainEntityBase,
  ): Promise<ContactInformationDomainEntityBase | null> {
    // return await this.contactInformationService.updateContactInformation(
    //   userId,
    //   entity,
    // );
    throw new AggregateRootException('Method not implemented.');
  }

  deleteContactInformation(userId: string): Promise<boolean> {
    // return this.contactInformationService.deleteContactInformation(userId);
    throw new AggregateRootException('Method not implemented.');
  }
}
