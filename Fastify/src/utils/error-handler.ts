import * as HttpStatus from 'http-status-codes';
import { FastifyReply } from 'fastify';

export enum ErrorCodes {
  NOT_AUTHORIZED = 'not_authorized',
  NOT_IMPLEMENTED = 'not_implemented',
  DB_QUERY_FAIL = 'db_query_failed',
  INVALID_FORMAT = 'invalid_format',
  EMPTY_RESPONSE = 'empty_response',
  CONNECTION_CLOSED = 'connection_closed',
}

export class AuthorizationException extends Error {
  constructor() {
    super();
    this.name = ErrorCodes.NOT_AUTHORIZED;
    this.message = 'Authentication failed.';
  }
}

export class MissingHeaderException extends Error {
  constructor() {
    super();
    this.name = ErrorCodes.NOT_AUTHORIZED;
    this.message = 'Missing Header.';
  }
}

export class DBException extends Error {
  constructor() {
    super();
    this.name = ErrorCodes.DB_QUERY_FAIL;
    this.message = 'DB query failed.';
  }
}

export class ApiClientException extends Error {
  constructor(error_code: string) {
    super();
    this.name = error_code;
    this.message = 'Api call unexpected reply.';
  }
}

export class InvalidFormatException extends Error {
  constructor() {
    super();
    this.name = ErrorCodes.INVALID_FORMAT;
    this.message = 'Invalid payload received.';
  }
}

export class EmptyResponseException extends Error {
  constructor() {
    super();
    this.name = ErrorCodes.EMPTY_RESPONSE;
    this.message = 'Empty response.';
  }
}

export class ConnectionClosedException extends Error {
  constructor() {
    super();
    this.name = ErrorCodes.CONNECTION_CLOSED;
    this.message = 'A connection could not be established.';
  }
}

export class CustomException extends Error {
  constructor(error_code: string, message: string) {
    super();
    this.name = error_code;
    this.message = message;
  }
}

export class HttpException extends Error {
  constructor(error_code: string, error_message: string) {
    super();
    this.name = error_code;
    this.message = error_message;
  }
}

function getStatusCode(error_code: string): number {
  switch (error_code) {
    case ErrorCodes.NOT_IMPLEMENTED:
      return HttpStatus.StatusCodes.NOT_IMPLEMENTED;
    default:
      return HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export function errorHandler(reply: FastifyReply, error: Error, function_name: string): FastifyReply {
  reply.log.error({ error: JSON.stringify(error), name: function_name });
  const error_obj = { success: false, error_code: error.name, message: error.message ?? '' };
  switch (error.constructor) {
    case AuthorizationException:
      return reply.status(HttpStatus.StatusCodes.UNAUTHORIZED).send(error_obj);
    case DBException:
      return reply.status(HttpStatus.StatusCodes.NOT_FOUND).send(error_obj);
    case CustomException:
    case MissingHeaderException:
      return reply.status(HttpStatus.StatusCodes.BAD_REQUEST).send(error_obj);
    case HttpException:
      return reply.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send(error_obj);
    case InvalidFormatException:
      return reply.status(HttpStatus.StatusCodes.UNPROCESSABLE_ENTITY).send();
    case ApiClientException:
      const status = getStatusCode(error.name);
      return reply.status(status).send(error_obj);
    default:
      return reply.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send(error_obj);
  }
}
