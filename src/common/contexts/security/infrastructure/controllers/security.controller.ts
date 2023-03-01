import { Body, Controller, Post } from '@nestjs/common';
import { AddCustomerUserCommand } from '../commands';
import { UserService } from '../persistence';
import { RegisteredUserEventPublisher } from '../messaging/publisher';
import { AddCustomerUserUseCase } from '../../application';

@Controller('security')
export class SecurityController {
  constructor(
    private readonly userService: UserService,
    private readonly registeredUserEventPublisher: RegisteredUserEventPublisher,
  ) {}

  @Post()
  async addCustomerUser(@Body() command: AddCustomerUserCommand) {
    const useCase = new AddCustomerUserUseCase(
      this.userService,
      this.registeredUserEventPublisher,
    );
    return await useCase.execute(command);
  }
}
