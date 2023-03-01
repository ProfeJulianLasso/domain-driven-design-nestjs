import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryFailedErrorExceptionFilter
  implements ExceptionFilter<QueryFailedError>
{
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    let message = '';
    let statusCode = HttpStatus.CONFLICT;
    let error = '';

    switch (exception.driverError.code) {
      case '23505':
        message = this.getMessageForConstraint(
          exception.driverError.constraint,
        );
        statusCode = HttpStatus.CONFLICT;
        error = `Code: ${exception.driverError.code} - ${exception.driverError.detail}`;
        break;
      case '22008':
        message = exception.driverError.message;
        statusCode = HttpStatus.CONFLICT;
        error = `Code: ${exception.driverError.code}`;
        break;
      default:
        message =
          'We have problems. Code: ' +
          exception.driverError.code +
          '. ' +
          (exception.driverError.constraint ||
            exception.driverError.detail ||
            exception.driverError.message);
        statusCode = HttpStatus.CONFLICT;
    }

    response.status(statusCode).json({ statusCode, message, error });
  }

  private getMessageForConstraint(constraint: string): string {
    switch (constraint) {
      case 'client_cli_email_Idx':
        return 'Email is already registered';
      case 'client_cli_phone_Idx':
        return 'The telephone number is already registered';
      default:
        return constraint + ' unclassified error';
    }
  }
}
