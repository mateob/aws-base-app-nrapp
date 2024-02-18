import {
  userGroupCreateValidator,
  userGroupDeleteValidator,
  userGroupGetAllValidator,
  userGroupUpdateValidator,
} from '@validators/user-group.validator';
import { AppContext } from '@interfaces/app-context.interface';
import { IResponseHandler } from '@interfaces/status-handler.interface';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { middyfy } from '@middlewares/middyfy';
import { ResponseHandler } from '@middlewares/status-handler';
import { UserGroupFactory } from '@factories/user-group.factory';
import { BloquedRequest } from '@interfaces/base-response.interface';
import logger from '../config/utils/logger';

export const getAll = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = UserGroupFactory.createInstance();
    const data = await service.findAll();
    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('User Group - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, userGroupGetAllValidator);

export const create = middyfy(async (event: APIGatewayProxyEvent, context: AppContext): Promise<IResponseHandler> => {
  try {
    const { body } = event;
    logger.error('User Group - Create: [user: {userName} - {name}] - body: {body}', { ...context.authData, body });
    return ResponseHandler.created(body);
  } catch (error) {
    logger.error('User Group - Create: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, userGroupCreateValidator);

export const update = middyfy(async (event: APIGatewayProxyEvent, context: AppContext): Promise<IResponseHandler> => {
  try {
    const { body } = event;
    logger.error('User Group - Create: [user: {userName} - {name}] - body: {body}', { ...context.authData, body });
    return ResponseHandler.ok(body);
  } catch (error) {
    logger.error('User Group - Create: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, userGroupUpdateValidator);

export const remove = middyfy(async (event: APIGatewayProxyEvent, context: AppContext): Promise<IResponseHandler> => {
  try {
    const { body } = event;
    logger.error('User Group - Remove: [user: {userName} - {name}] - body: {body}', { ...context.authData, body });
    return ResponseHandler.noContent();
  } catch (error) {
    logger.error('User Group - Create: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, userGroupDeleteValidator);

export const bloqued = middyfy(async (event: APIGatewayProxyEvent, _: AppContext): Promise<IResponseHandler> => {
  try {
    const bloquedReq: BloquedRequest = event.body as any;

    const service = UserGroupFactory.createInstance();
    service.bloqued(bloquedReq.id, bloquedReq.status);
    return ResponseHandler.notFound();
  } catch (error) {
    return ResponseHandler.badRequest(error);
  }
});
