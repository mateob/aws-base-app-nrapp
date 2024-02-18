import { APIGatewayProxyEvent } from 'aws-lambda';
import { middyfy } from '@middlewares/middyfy';
import { AppContext } from '@interfaces/app-context.interface';
import { IResponseHandler } from '@interfaces/status-handler.interface';
import { UserFactory } from '@factories/user.factory';
import { userCreateValidator, userGetByIdValidator, userGetAllValidator } from '@validators/user.validator';
import { ResponseHandler } from '@middlewares/status-handler';
import logger from '../config/utils/logger';

export const getAll = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = UserFactory.createInstance();
    const data = await service.findAll();
    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('User - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, userGetAllValidator);

export const getById = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = UserFactory.createInstance();
    const data = await service.findAll();
    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('User - GetById: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, userGetByIdValidator);

export const create = middyfy(async (event: APIGatewayProxyEvent, context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = UserFactory.createInstance();
    const { body } = event;
    const { authData: { userName } } = context;
    logger.info('User - Create: [user: {userName} - {name}] - body: {body}', { userName, body });

    const data = await service.create(body as any);

    const customer = await UserFactory.createInstance().create({} as any);
    await service.updateById(data.id, { ...data, customerId: customer.id } as any);

    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('User - Create: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, userCreateValidator);
