import { IsString } from 'class-validator';
import { IAddCustomerUserCommand } from '../../domain';

export class AddCustomerUserCommand implements IAddCustomerUserCommand {
  @IsString({ message: 'El tipo de documento es requerido' })
  documentType: string;

  @IsString({ message: 'El documento es requerido' })
  document: string;

  @IsString({ message: 'El nombre es requerido' })
  name: string;

  @IsString({ message: 'El apellido es requerido' })
  lastname: string;

  @IsString({ message: 'El correo electrónico es requerido' })
  email: string;

  @IsString({ message: 'El teléfono es requerido' })
  phone: string;

  @IsString({ message: 'La dirección es requerida' })
  homeAddress: string;
}
