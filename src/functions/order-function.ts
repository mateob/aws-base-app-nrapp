import { AppContext } from '@interfaces/app-context.interface';
import { IResponseHandler } from '@interfaces/status-handler.interface';
import { middyfy } from '@middlewares/middyfy';
import { ResponseHandler } from '@middlewares/status-handler';
import { APIGatewayProxyEvent } from 'aws-lambda';
import logger from '../config/utils/logger';

/** ----- START ORDER ----- */

export const getAll = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    return ResponseHandler.ok();
  } catch (error) {
    logger.error('User - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
});

export const getById = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    return ResponseHandler.ok();
  } catch (error) {
    logger.error('User - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
});

export const create = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    return ResponseHandler.ok();
  } catch (error) {
    logger.error('User - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
});

export const update = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    return ResponseHandler.ok();
  } catch (error) {
    logger.error('User - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
});

export const addItemToOrder = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    return ResponseHandler.ok();
  } catch (error) {
    logger.error('User - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
});

export const isBloqued = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    return ResponseHandler.ok();
  } catch (error) {
    logger.error('User - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
});

export const remove = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    return ResponseHandler.ok();
  } catch (error) {
    logger.error('User - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
});

export const getNFE = middyfy(async (_event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    return ResponseHandler.ok();
  } catch (error) {
    logger.error('User - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
});

/** ----- FINISH ORDER ----- */

/** ----- START ORDER ITEM ----- */

// - AddItem -
// - - Headers
// - - - CuustomerID
// - - - Token
// - - Path
// - - - NumeroPedido
// - - Body
// - - - ProductId
// - - - Quantity
// - RemoveItem -
// - - Headers
// - - - CustomerId
// - - - Token
// - - Path
// - - - NumeroPedido
// - - Body
// - - - ProductId
// - UpdateItem
// - - Headers
// - - - CustomerId
// - - - Token
// - - Path
// - - - NumeroPedido
// - - Body
// - - - ProdutoId
// - - - Quantidade

/** ----- FINISH ORDER ITEM ----- */

/** ----- START ORDER TYPE ----- */

// - GetById
// - GetAll
// - Create
// - Update
// - Bloqued
// - Unbloqued
// - Remove - SoftDelete

/** ----- FINISH ORDER TYPE ----- */
