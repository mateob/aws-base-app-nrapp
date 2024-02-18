import { AppContext } from '@interfaces/app-context.interface';
import { IResponseHandler } from '@interfaces/status-handler.interface';
import { middyfy } from '@middlewares/middyfy';
import { ResponseHandler } from '@middlewares/status-handler';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { RestrictionFactory } from '@factories/restriction.factory';
import { restrictionGetByAnalysisValidator } from '@validators/restriction.validator';
import logger from '../config/utils/logger';

export const getByAnalysis = middyfy(async (event: APIGatewayProxyEvent, _context: AppContext): Promise<IResponseHandler> => {
  try {
    const service = RestrictionFactory.createInstance();
    const { pathParameters: { analysisUuid } } = event;

    const data = await service.findByAnalysis(analysisUuid);
    return ResponseHandler.ok(data);
  } catch (error) {
    logger.error('Analysis - GetAll: {error}', error);
    return ResponseHandler.badRequest(error);
  }
}, restrictionGetByAnalysisValidator);
