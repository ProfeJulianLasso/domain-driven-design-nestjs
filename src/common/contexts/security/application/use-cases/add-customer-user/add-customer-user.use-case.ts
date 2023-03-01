import {
  ContactInformationDomainEntityBase,
  IAddCustomerUserCommand,
  IAddCustomerUserResponse,
  IContactInformationDomainEntity,
  IUserDomainService,
  RegisteredUserEventPublisherBase,
  RoleDomainEntityBase,
  UserAggregateRoot,
  UserDomainEntityBase,
} from '../../../domain';
import {
  ValueObjectErrorHandler,
  IUseCase,
  ValueObjectException,
} from '../../../../../libs/sofka';
import {
  NameValueObject,
  DocumentTypeValueObject,
  DocumentValueObject,
  LastnameValueObject,
  EmailValueObject,
  PhoneValueObject,
  HomeAddressValueObject,
} from '../../../domain/value-objects/contact-information';

export class AddCustomerUserUseCase<
    CommandType extends IAddCustomerUserCommand = IAddCustomerUserCommand,
    ResponseType extends IAddCustomerUserResponse = IAddCustomerUserResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<CommandType, ResponseType>
{
  private readonly userAggregateRoot: UserAggregateRoot;

  constructor(
    private readonly userService: IUserDomainService,
    private readonly registeredUserEventPublisher: RegisteredUserEventPublisherBase,
  ) {
    super();
    this.userAggregateRoot = new UserAggregateRoot({
      userService,
      registeredUserEventPublisher,
    });
  }

  async execute(command: CommandType): Promise<ResponseType> {
    const data = await this.executeCommand(command);
    return { success: data ? true : false, data } as ResponseType;
  }

  private async executeCommand(
    command: CommandType,
  ): Promise<UserDomainEntityBase | null> {
    const ValueObjects = this.createValueObjects(command);
    this.validateValueObjects(ValueObjects);
    const entity = this.createEntityUserDomain(ValueObjects);
    return await this.executeUserAggregateRoot(entity);
  }

  private createValueObjects(
    command: CommandType,
  ): IContactInformationDomainEntity {
    const documentType = new DocumentTypeValueObject(command.documentType);
    const document = new DocumentValueObject(command.document);
    const name = new NameValueObject(command.name);
    const lastname = new LastnameValueObject(command.lastname);
    const email = new EmailValueObject(command.email);
    const phone = new PhoneValueObject(command.phone);
    const homeAddress = new HomeAddressValueObject(command.homeAddress);
    return {
      documentType,
      document,
      name,
      lastname,
      email,
      phone,
      homeAddress,
    };
  }

  private validateValueObjects(
    valueObject: IContactInformationDomainEntity,
  ): void {
    const {
      documentType,
      document,
      name,
      lastname,
      email,
      phone,
      homeAddress,
    } = valueObject;

    if (
      documentType instanceof DocumentTypeValueObject &&
      documentType.hasErrors()
    )
      this.setErrors(documentType.getErrors());

    if (document instanceof DocumentValueObject && document.hasErrors())
      this.setErrors(document.getErrors());

    if (name instanceof NameValueObject && name.hasErrors())
      this.setErrors(name.getErrors());

    if (lastname instanceof LastnameValueObject && lastname.hasErrors())
      this.setErrors(lastname.getErrors());

    if (email instanceof EmailValueObject && email.hasErrors())
      this.setErrors(email.getErrors());

    if (phone instanceof PhoneValueObject && phone.hasErrors())
      this.setErrors(phone.getErrors());

    if (
      homeAddress instanceof HomeAddressValueObject &&
      homeAddress.hasErrors()
    )
      this.setErrors(homeAddress.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por AddCustomerUserUseCase',
        this.getErrors(),
      );
  }

  private createEntityUserDomain(
    valueObject: IContactInformationDomainEntity,
  ): UserDomainEntityBase {
    const {
      documentType,
      document,
      name,
      lastname,
      email,
      phone,
      homeAddress,
    } = valueObject;

    return new UserDomainEntityBase({
      role: [
        new RoleDomainEntityBase({
          roleId: '74764603-185c-4f1d-8633-381dbb4a8481',
        }),
      ],
      contactInformation: new ContactInformationDomainEntityBase({
        documentType: documentType.valueOf(),
        document: document.valueOf(),
        name: name.valueOf(),
        lastname: lastname.valueOf(),
        email: email.valueOf(),
        phone: phone.valueOf(),
        homeAddress: homeAddress.valueOf(),
      }),
      verifiedEmail: false,
    });
  }

  private executeUserAggregateRoot(
    entity: UserDomainEntityBase,
  ): Promise<UserDomainEntityBase | null> {
    return this.userAggregateRoot.registerUser(entity);
  }
}
