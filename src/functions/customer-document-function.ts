import { AppContext } from '@interfaces/app-context.interface';
import { IResponseHandler } from '@interfaces/status-handler.interface';
import { middyfy } from '@middlewares/middyfy';
import { ResponseHandler } from '@middlewares/status-handler';
import {
  customerDocumentCreateValidator, customerDocumentGetAllValidator, customerDocumentGetByIdValidator, customerDocumentUpdateValidator,
} from '@validators/customer-document.validator';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomerDocumentFactory } from '@factories/customer-document.factory';
import logger from '../config/utils/logger';

export const getAllByCustomerId = middyfy(async (event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = CustomerDocumentFactory.createInstance();
    const { pathParameters: { id } } = event;
    const dataList = await service.findAll({ where: { customerId: id } });
    return ResponseHandler.ok(dataList);
  } catch (error) {
    logger.error('Customer Document - GetAll By Customer ID: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, customerDocumentGetAllValidator);

export const getById = middyfy(async (event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = CustomerDocumentFactory.createInstance();
    const { pathParameters: { id } } = event;
    const data = await service.findOne(id);
    if (data) {
      return ResponseHandler.ok(data);
    }
    return ResponseHandler.noContent();
  } catch (error) {
    logger.error('Customer Document - GetById: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, customerDocumentGetByIdValidator);

export const create = middyfy(async (event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = CustomerDocumentFactory.createInstance();
    const { body } = event;
    // const { authData: { userName } } = context;
    const data = await service.create(body as any);
    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('Customer Document - Create: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, customerDocumentCreateValidator);

export const update = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    return ResponseHandler.ok();
  } catch (error) {
    logger.error('Customer Document - Update: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, customerDocumentUpdateValidator);

export const remove = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    return ResponseHandler.ok();
  } catch (error) {
    return ResponseHandler.badRequest(error);
  }
});
