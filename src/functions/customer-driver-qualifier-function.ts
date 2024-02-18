import { middyfy } from '@middlewares/middyfy';
import { customerDriverQualifierGetAllValidator } from '@validators/customer-driver-qualifier.validator';
import { ResponseHandler } from '@middlewares/status-handler';
import { CustomerDriverQualifierFactory } from '@factories/customer-driver-qualifier.factory';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { IResponseHandler } from '@interfaces/status-handler.interface';
import { AppContext } from '@interfaces/app-context.interface';
import logger from '../config/utils/logger';

export const getAllByCustomerId = middyfy(async (event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = CustomerDriverQualifierFactory.createInstance();
    const { pathParameters: { id } } = event;
    const dataList = await service.findAll({ where: { customerId: id } });
    return ResponseHandler.ok(dataList);
  } catch (error) {
    logger.error('Customer Document - GetAll By Customer ID: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, customerDriverQualifierGetAllValidator);
