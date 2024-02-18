import { StatusCodes } from 'http-status-codes';

export interface IErrorHandler {
  code?: number;
  errorMessage?: string;
}

export interface IResponseHandler {
  headers: { [header: string]: string };
  statusCode: StatusCodes;
  body?: { data?: string | any, errorData?: IErrorHandler }
}
