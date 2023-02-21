import { v4 as uuid } from 'uuid';
import { EventDomainEntityBase, IEventDomainEntity } from '.';
import { ObjectValueException } from '../../../../libs/sofka';

class EventEntity extends EventDomainEntityBase {}

describe('EventDomainEntity', () => {
  let eventDomainEntity: EventEntity;

  beforeEach(() => {
    eventDomainEntity = new EventEntity({} as IEventDomainEntity);
  });

  it('should be defined', () => {
    expect(eventDomainEntity).toBeDefined();
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
    eventDomainEntity = new EventEntity(data);
    jest.spyOn(eventDomainEntity, 'getErrors');
    jest.spyOn(eventDomainEntity, 'setErrors');

    try {
      // Act
      eventDomainEntity.validateData();
      expect(true).toBe(false);
    } catch (error) {
      // Assert
      expect(eventDomainEntity.getErrors).toBeCalled();
      expect(eventDomainEntity.setErrors).toBeCalledTimes(6);
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
    eventDomainEntity = new EventEntity(data);
    jest.spyOn(eventDomainEntity, 'getErrors');
    jest.spyOn(eventDomainEntity, 'setErrors');

    // Act
    eventDomainEntity.validateData();

    // Assert
    expect(eventDomainEntity.getErrors).not.toBeCalled();
    expect(eventDomainEntity.setErrors).not.toBeCalled();
  });
});
