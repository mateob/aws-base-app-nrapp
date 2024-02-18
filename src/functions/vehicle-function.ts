import { AppContext } from '@interfaces/app-context.interface';
import { IResponseHandler } from '@interfaces/status-handler.interface';
import { middyfy } from '@middlewares/middyfy';
import { ResponseHandler } from '@middlewares/status-handler';
import { APIGatewayProxyEvent } from 'aws-lambda';
import {
  vehicleBloquedValidator, vehicleCreateValidator, vehicleGetAllValidator, vehicleGetByIdValidator, vehicleUpdateByIdValidator,
} from '@validators/vehicle.validator';
import { VehicleFactory } from '@factories/vehicle.factory';
import logger from '../config/utils/logger';

export const getAll = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = VehicleFactory.createInstance();
    const data = await service.findAll();

    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('Vehicle - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, vehicleGetAllValidator);

export const getById = middyfy(async (event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = VehicleFactory.createInstance();
    const { pathParameters: { id } } = event;

    const data = await service.findOne(id);
    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('Vehicle - getById: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, vehicleGetByIdValidator);

export const updateById = middyfy(async (event: APIGatewayProxyEvent, context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = VehicleFactory.createInstance();
    const { pathParameters: { id }, body } = event;
    const { authData: { userName } } = context;
    logger.info('Vehicle - UpdateById: [user: {userName} - {name}] - body: {body}', { userName, body });

    const data = await service.updateById(id, body as any);
    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('Vehicle - UpdateById: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, vehicleUpdateByIdValidator);

export const create = middyfy(async (event: APIGatewayProxyEvent, context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = VehicleFactory.createInstance();
    const { body } = event;
    const { authData: { userName } } = context;
    logger.info('Vehicle - Create: [user: {userName} - {name}] - body: {body}', { userName, body });

    const data = await service.create(body as any);
    return ResponseHandler.created(data);
  } catch (error) {
    logger.error('Vehicle - Create: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, vehicleCreateValidator);

export const bloqued = middyfy(async (event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = VehicleFactory.createInstance();
    const { pathParameters: { id } } = event;
    service.bloqued(id, true);

    return ResponseHandler.noContent();
  } catch (error) {
    logger.error('Analysis - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, vehicleBloquedValidator);
