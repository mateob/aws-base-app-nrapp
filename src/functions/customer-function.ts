import { CustomerFactory } from '@factories/customer.factory';
import { AppContext } from '@interfaces/app-context.interface';
import { IResponseHandler } from '@interfaces/status-handler.interface';
import { middyfy } from '@middlewares/middyfy';
import { ResponseHandler } from '@middlewares/status-handler';
import { customerCreateValidator, customerGetAllValidator, customerGetByIdValidator } from '@validators/customer.validator';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { UserFactory } from '@factories/user.factory';
import logger from '../config/utils/logger';

export const getAll = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = CustomerFactory.createInstance();
    const data = await service.findAll();
    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('Customer - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, customerGetAllValidator);

export const getById = middyfy(async (event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = CustomerFactory.createInstance();
    const { pathParameters: { id } } = event;
    const data = await service.findOne(id);
    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('Customer - GetById: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, customerGetByIdValidator);

export const create = middyfy(async (event: APIGatewayProxyEvent, context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = CustomerFactory.createInstance();
    const { body } = event;
    const { authData: { userName } } = context;
    logger.info('Customer - Create: [user: {userName} - {name}] - body: {body}', { userName, body });
    const { login, ...data } = body as any;
    const { dataValues } = await service.create(data);
    const { id, userName: loginName } = await UserFactory.createInstance().create({
      ...login,
      name: dataValues.name,
      internal: false,
      userGroupId: '2c013b57-6251-4f9e-bb96-c449ff3e85ed',
      customerId: dataValues.id,
      userType: 'system',
    } as any);
    return ResponseHandler.ok({ login: { id, userName: loginName }, ...dataValues } as any);
  } catch (error) {
    logger.error('Customer - Create: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, customerCreateValidator);

export const notification = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    CustomerFactory.createInstance().sendNotification();
    return ResponseHandler.noContent();
  } catch (error) {
    logger.error('Customer - Create: {error}', error);
    return ResponseHandler.badRequest(error);
  }
});
