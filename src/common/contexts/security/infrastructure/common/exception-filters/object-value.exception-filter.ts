import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ValueObjectException } from '../../../../../libs/sofka';

@Catch(ValueObjectException)
export class ValueObjectExceptionFilter
  implements ExceptionFilter<ValueObjectException>
{
  catch(exception: ValueObjectException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const message = exception.message;
    const statusCode = HttpStatus.BAD_REQUEST;
    const error = exception.errors;

    response.status(statusCode).json({ statusCode, message, error });
  }
}
