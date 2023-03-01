import { AddCustomerUserUseCase } from '.';
import {
  IUserDomainService,
  RegisteredUserEventPublisherBase,
} from '../../../domain';

describe('AddCustomerUserUseCase', () => {
  let useCase: AddCustomerUserUseCase;

  beforeEach(() => {
    const userService = {
      getUser: jest.fn(),
      registerUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    } as IUserDomainService;
    const registeredUserEventPublisher = {
      publish: jest.fn(),
    } as unknown as RegisteredUserEventPublisherBase;
    useCase = new AddCustomerUserUseCase(
      userService,
      registeredUserEventPublisher,
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });
});
