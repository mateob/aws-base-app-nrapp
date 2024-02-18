import { IErrorHandler, IResponseHandler } from '@interfaces/status-handler.interface';
import { StatusCodes } from 'http-status-codes';
import { CONTENT_TYPE_JSON } from '../constants/http.constants';

export class ResponseHandler {
  private static internalError: IErrorHandler = { code: StatusCodes.INTERNAL_SERVER_ERROR, errorMessage: 'Internal server error.' };

  private static unauthorizedError: IErrorHandler = { code: StatusCodes.UNAUTHORIZED, errorMessage: 'Unauthorized user' };

  private static headers: { [key: string]: string } = {
    'Content-Type': CONTENT_TYPE_JSON,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization',
  };

  static ok = (data?: any) => ResponseHandler.messageFormat(StatusCodes.OK, { data });

  static created = (data?: any) => ResponseHandler.messageFormat(StatusCodes.CREATED, { data });

  static notFound = (data?: any) => ResponseHandler.messageFormat(StatusCodes.NOT_FOUND, { data });

  static unauthorized = (error?: IErrorHandler) => ResponseHandler.messageFormat(
    StatusCodes.UNAUTHORIZED,
    { errorData: error ?? this.unauthorizedError },
  );

  static noContent = () => ResponseHandler.messageFormat(StatusCodes.NO_CONTENT);

  static internalServerError = () => ResponseHandler.messageFormat(StatusCodes.INTERNAL_SERVER_ERROR, { errorData: this.internalError });

  static badRequest = (error?: IErrorHandler) => ResponseHandler.messageFormat(StatusCodes.BAD_REQUEST, { errorData: error });

  static errorRequest = (status: StatusCodes, error?: IErrorHandler) => ResponseHandler.messageFormat(
    status,
    { errorData: error ?? this.internalError },
  );

  private static messageFormat(
    statusCode: StatusCodes,
    body: {
      data?: any,
      errorData?: {
        code?: number,
        errorMessage?: string
      }
    } = { },
  ): IResponseHandler {
    if (body.data) {
      return { headers: this.headers, statusCode, body };
    }
    return { headers: this.headers, statusCode, body };
  }
}
