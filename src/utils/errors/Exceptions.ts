interface ErrorResponse {
  errorCode: number
  message: string
}

abstract class ApiError extends Error {
  public readonly errorCode: number;
  public readonly statusCode: number;

  constructor (message: string, erroCode: number, statusCode: number) {
    super(message);
    this.errorCode = erroCode;
    this.statusCode = statusCode;
  }

  public getErrorResponse (): ErrorResponse {
    return {
      errorCode: this.errorCode,
      message: this.message
    };
  }
}

export class InternalServerError extends Error {
  public readonly errorCode = 0;
  public readonly statusCode = 500;

  constructor (err: Error) {
    super(err.message);
  }

  public getErrorResponse (): ErrorResponse {
    return {
      errorCode: this.errorCode,
      message: this.message
    };
  }
}

export class NotFoundException extends ApiError {
  constructor (message: string) {
    super(message, 1, 404);
  }
}

export class BadRequestException extends ApiError {
  constructor (message: string) {
    super(message, 2, 400);
  }
}

export class InvalidCredentialsException extends ApiError {
  constructor (message: string) {
    super(message, 3, 400);
  }
}
