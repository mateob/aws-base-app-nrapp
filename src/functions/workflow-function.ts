import { AppContext } from '@interfaces/app-context.interface';
import { IResponseHandler } from '@interfaces/status-handler.interface';
import { middyfy } from '@middlewares/middyfy';
import { ResponseHandler } from '@middlewares/status-handler';
import { APIGatewayProxyEvent } from 'aws-lambda';
import {
  workflowAssignValidator,
  workflowCreateValidator,
  workflowGetAllValidator,
  workflowGetByIdValidator,
  workflowRemoveValidator,
  workflowUpdateValidator,
} from '@validators/workflow.validator';
import { WorkflowFactory } from '@factories/workflow.factory';
import { WorkflowTypeEnum } from '@enums/workflow-type.enum';
import logger from '../config/utils/logger';

export const getAll = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = WorkflowFactory.createInstance();
    const data = await service.findAll();
    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('Workflow Task - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, workflowGetAllValidator);

export const getById = middyfy(async (event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = WorkflowFactory.createInstance();
    const { pathParameters: { id } } = event;
    const data = await service.findOne(id);
    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('Workflow Task - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, workflowGetByIdValidator);

export const create = middyfy(async (event: APIGatewayProxyEvent, context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = WorkflowFactory.createInstance();
    const { body } = event;
    const { authData: { userName } } = context;
    logger.info('Workflow - Create: [user: {userName} - {name}] - body: {body}', { userName, body });

    const data = await service.create(body as any);
    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('Workflow Task - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, workflowCreateValidator);

export const assign = middyfy(async (event: APIGatewayProxyEvent, context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = WorkflowFactory.createInstance();
    const { pathParameters: { id } } = event;
    const { authData: { userId } } = context; // TODO: Trazer o nome do agente.
    await service.assign(userId, id);

    return ResponseHandler.noContent();
  } catch (error) {
    logger.error('Workflow Task - Assign: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, workflowAssignValidator);

export const updateById = middyfy(async (event: APIGatewayProxyEvent, context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = WorkflowFactory.createInstance();
    const { pathParameters: { id }, body } = event;
    const { authData: { userName, id: userId } } = context;
    logger.info('Workflow Task - UpdateById: [user: {userName} - {name}] - body: {body}', { userName, body });

    const data = await service.updateById(id, {
      ...body as any,
      entityRef: userId,
      status: WorkflowTypeEnum.IN_PROGRESS.type,
    } as any);
    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('Workflow Task - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, workflowUpdateValidator);

export const remove = middyfy(async (event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = WorkflowFactory.createInstance();
    const { pathParameters: { id } } = event;

    await service.destroy(id);
    return ResponseHandler.noContent();
  } catch (error) {
    logger.error('Workflow Task - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, workflowRemoveValidator);
