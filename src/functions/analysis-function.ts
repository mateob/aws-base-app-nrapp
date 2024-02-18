import { AppContext } from '@interfaces/app-context.interface';
import { IResponseHandler } from '@interfaces/status-handler.interface';
import { middyfy } from '@middlewares/middyfy';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { ResponseHandler } from '@middlewares/status-handler';
import {
  analysisAssignValidator,
  analysisCancelValidator,
  analysisCreateValidator,
  analysisGetAllValidator,
  analysisGetByIdValidator,
  analysisUpdateStatusValidator,
  analysisUpdateValidator,
} from '@validators/analysis.validator';
import { AnalysisFactory } from '@factories/analysis.factory';

import { WorkflowFactory } from '@factories/workflow.factory';
import { Op } from 'sequelize';
import { AnalysisCustomerModel } from '@entities/analysis-customer.model';
import { AnalysisCustomerFactory } from '@factories/analysis-customer.factory';
import { AnalysisVehicleModel } from '@entities/analysis-vehicle.model';
import { AnalysisVehicleFactory } from '@factories/analysis-vehicle.factory';
import logger from '../config/utils/logger';

export const getAll = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = AnalysisFactory.createInstance();
    const data = await service.findAll();
    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('Analysis - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, analysisGetAllValidator);

export const getAllActives = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = AnalysisFactory.createInstance();
    const data = await service.findAll({ where: { status: { [Op.ne]: 'finished' } } });
    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('Analysis - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, analysisGetAllValidator);

export const getById = middyfy(async (event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = AnalysisFactory.createInstance();
    const { pathParameters: { id } } = event;

    const data = await service.findOne(id);
    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('Analysis - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, analysisGetByIdValidator);

export const updateById = middyfy(async (event: APIGatewayProxyEvent, context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = AnalysisFactory.createInstance();
    const { pathParameters: { id }, body } = event;
    const { authData: { userName } } = context;
    logger.info('Analysis - UpdateById: [user: {userName} - {name}] - body: {body}', { userName, body });

    const data = await service.updateById(id, body as any);
    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('Analysis - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, analysisUpdateValidator);

export const create = middyfy(async (event: APIGatewayProxyEvent, context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = AnalysisFactory.createInstance();
    const { body } = event;
    const { authData: { userName } } = context;
    logger.info('Analysis - Create: [user: {userName} - {name}] - body: {body}', { userName, body });
    const { analysisCustomer = null, analysisVehicle = null, ...dataBody } = body as any;
    const { dataValues } = await service.create(dataBody);
    let analysisCustomerData: AnalysisCustomerModel = {} as any;
    if (analysisCustomer) {
      analysisCustomerData = await AnalysisCustomerFactory.createInstance()
        .createOfAnalysis(analysisCustomer, dataValues.id);
    }
    let analysisVehicleData: AnalysisVehicleModel = {} as any;
    if (analysisVehicle) {
      analysisVehicleData = await AnalysisVehicleFactory.createInstance()
        .createOfAnalysis(analysisVehicle, dataValues.id);
    }

    return ResponseHandler.ok({ ...dataValues, analysisCustomer: analysisCustomerData, analysisVehicle: analysisVehicleData } as any);
  } catch (error) {
    logger.error('Analysis - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, analysisCreateValidator);

export const assign = middyfy(async (event: APIGatewayProxyEvent, context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = AnalysisFactory.createInstance();
    const { body } = event;
    const { authData } = context;
    const data = await service.assign(body as any, authData);
    const workflowService = WorkflowFactory.createInstance();
    const filter: any = {
      [Op.and]: [{ uuidRef: authData.id }],
    };
    workflowService.findAll(filter);

    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('Analysis - Assign: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, analysisAssignValidator);

export const updateStatus = middyfy(async (event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = AnalysisFactory.createInstance();
    const { body: { uuid, status } }: any = event;
    const data = await service.updateStatus(uuid, status);

    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('Analysis - Update Status: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, analysisUpdateStatusValidator);

export const cancel = middyfy(async (event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = AnalysisFactory.createInstance();
    const { body } = event;
    const data = await service.cancel(body as any);

    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('Analysis - Cancel: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, analysisCancelValidator);
