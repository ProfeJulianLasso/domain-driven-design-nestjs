import { v4 as uuid } from 'uuid';
import { EventDomainEntityBase, IEventDomainEntity } from '.';
import { ObjectValueException } from '../../../../libs/sofka';

class EventEntity extends EventDomainEntityBase {}

describe('EventDomainEntityBase', () => {
  let eventDomainEntityBase: EventEntity;

  beforeEach(() => {
    eventDomainEntityBase = new EventEntity({} as IEventDomainEntity);
  });

  it('should be defined', () => {
    expect(eventDomainEntityBase).toBeDefined();
  });

  it('should fail all validators', () => {
    // Arrange
    const data = {
      eventId: '123-123-123-123',
      aggregateRoot: '',
      context: '',
      eventName: '',
      payload: '',
    } as IEventDomainEntity;
    eventDomainEntityBase = new EventEntity(data);
    jest.spyOn(eventDomainEntityBase, 'getErrors');
    jest.spyOn(eventDomainEntityBase, 'setErrors');

    try {
      // Act
      eventDomainEntityBase.validateData();
      expect(true).toBe(false);
    } catch (error) {
      // Assert
      expect(eventDomainEntityBase.getErrors).toBeCalled();
      expect(eventDomainEntityBase.setErrors).toBeCalledTimes(6);
      expect(error).toBeInstanceOf(ObjectValueException);
      expect(error.message).toEqual('Hay algunos errores en la entidad Event');
      const errors = JSON.stringify(error);
      expect(errors).toContain(
        'El ID no contiene una estructura válida UUIDv4',
      );
      expect(errors).toContain('El valor de aggregateRoot es obligatorio');
      expect(errors).toContain('El valor de context es obligatorio');
      expect(errors).toContain('El valor de eventName es obligatorio');
      expect(errors).toContain('El valor de payload es obligatorio');
      expect(errors).toContain('El valor del dateTime es obligatorio');
    }
  });

  it('should not fail any validator', () => {
    // Arrange
    const data = {
      eventId: uuid(),
      context: 'accounts',
      aggregateRoot: 'customer',
      eventName: 'RegisterCustomer',
      payload: JSON.stringify({
        name: 'Julian Lasso',
        email: 'julian.lasso@sofka.com.co',
      }),
      dateTime: Date.now(),
    } as IEventDomainEntity;
    eventDomainEntityBase = new EventEntity(data);
    jest.spyOn(eventDomainEntityBase, 'getErrors');
    jest.spyOn(eventDomainEntityBase, 'setErrors');

    // Act
    eventDomainEntityBase.validateData();

    // Assert
    expect(eventDomainEntityBase.getErrors).not.toBeCalled();
    expect(eventDomainEntityBase.setErrors).not.toBeCalled();
  });
});
