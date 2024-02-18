import { middyfy } from '@middlewares/middyfy';
import { ResponseHandler } from '@middlewares/status-handler';
import { APIGatewayProxyEvent } from 'aws-lambda';
import {
  workflowGetAllValidator,
} from '@validators/workflow.validator';
import { AppContext } from '@interfaces/app-context.interface';
import { IResponseHandler } from '@interfaces/status-handler.interface';
import { WorkflowFactory } from '@factories/workflow.factory';
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
