import { Test, TestingModule } from '@nestjs/testing';
import { RegisteredUserEventPublisher } from '../messaging';
import {
  ContactInformationService,
  RoleService,
  UserService,
} from '../persistence';
import { SecurityController } from './security.controller';

describe('SecurityController', () => {
  let controller: SecurityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecurityController],
      providers: [
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: RoleService,
          useValue: {},
        },
        {
          provide: ContactInformationService,
          useValue: {},
        },
        {
          provide: RegisteredUserEventPublisher,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<SecurityController>(SecurityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
