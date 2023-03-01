import { RegisterLogUseCase } from '.';
import { ValueObjectException } from '../../../../../libs/sofka';
import {
  EventAggregateRoot,
  IAddLogCommand,
  IEventDomainService,
} from '../../../domain';

describe('RegisterLogUseCase', () => {
  let registerLogUseCase: RegisterLogUseCase<IAddLogCommand>;
  let mockEventService: IEventDomainService;
  let mockEventAggregate: EventAggregateRoot;

  beforeEach(() => {
    mockEventService = {
      getHistory: jest.fn(),
      addLog: jest.fn().mockImplementation((data) => data),
    } as IEventDomainService;
    mockEventAggregate = new EventAggregateRoot(mockEventService);
    registerLogUseCase = new RegisterLogUseCase(mockEventAggregate);
  });

  it('should be defined', () => {
    expect(registerLogUseCase).toBeDefined();
  });

  it('should throw an exception of type ValueObjectException', async () => {
    // Arrange
    const payload = {
      context: '',
      aggregateRoot: '',
      eventName: '',
      payload: '',
    } as IAddLogCommand;
    jest.spyOn(registerLogUseCase, 'executeValidations');

    try {
      // Act
      await registerLogUseCase.execute(payload);
      expect(true).toBe(false);
    } catch (error) {
      // Assert
      expect(registerLogUseCase.executeValidations).toBeCalledWith(payload);
      expect(error).toBeInstanceOf(ValueObjectException);
      expect(error.message).toEqual('Hay algunos errores en la entidad Event');
      expect(error).toHaveProperty('_errors');
      const errors = JSON.stringify(error);
      expect(errors).toContain('El valor de aggregateRoot es obligatorio');
      expect(errors).toContain('El valor de context es obligatorio');
      expect(errors).toContain('El valor de eventName es obligatorio');
      expect(errors).toContain('El valor del dateTime es obligatorio');
    }
  });

  it('should add a log correctly', async () => {
    // Arrange
    const dataPayload = JSON.stringify({
      contactInformationId: 'e6680af1-6b63-4acd-b6d3-83a9621feae1',
      documentType: 'CC',
      document: '17544282',
      name: 'Julian',
      lastname: 'Lasso',
      email: 'julian.lasso@sofka.com.co',
      phone: '555-555-5555',
      homeAddress: 'Cra. 12 # 34 - 12',
    });
    const payload = {
      context: 'accounts',
      aggregateRoot: 'customer',
      eventName: 'RegisterContactInformation',
      payload: dataPayload,
      dateTime: Date.now(),
    } as IAddLogCommand;

    jest.spyOn(registerLogUseCase, 'executeValidations');
    jest.spyOn(mockEventService, 'addLog');

    // Act
    const result = await registerLogUseCase.execute(payload);

    // Assert
    expect(registerLogUseCase.executeValidations).toBeCalledWith(payload);
    expect(mockEventService.addLog).toBeCalled();
    expect(result).toHaveProperty('data');
    expect(JSON.stringify(result)).toMatch(
      /^({"data":{"_errors":\[],)("eventId":{"_errors":\[],"_value":")([0-9A-Za-z]{8}-[0-9A-Za-z]{4}-4[0-9A-Za-z]{3}-[89ABab][0-9A-Za-z]{3}-[0-9A-Za-z]{12})("},"aggregateRoot":{"_errors":\[],"_value":"customer"},"context":{"_errors":\[],"_value":"accounts"},"eventName":{"_errors":\[],"_value":"RegisterContactInformation"},"payload":{"_errors":\[],"_value":"{\\"contactInformationId\\":\\"e6680af1-6b63-4acd-b6d3-83a9621feae1\\",\\"documentType\\":\\"CC\\",\\"document\\":\\"17544282\\",\\"name\\":\\"Julian\\",\\"lastname\\":\\"Lasso\\",\\"email\\":\\"julian.lasso@sofka.com.co\\",\\"phone\\":\\"555-555-5555\\",\\"homeAddress\\":\\"Cra. 12 # 34 - 12\\"}"},"dateTime":{"_errors":\[],"_value":)([0-9]{13})(},"createdAt":)([0-9]{13})(}})$/g,
    );
  });
});
