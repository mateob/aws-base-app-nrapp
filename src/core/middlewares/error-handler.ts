import httpErrorHandler from '@middy/http-error-handler';
import { FALLBACK_MESSAGE } from '@constants/http.constants';
import logger from '../../config/utils/logger';

export const errorHandler = () => httpErrorHandler({
  fallbackMessage: FALLBACK_MESSAGE,
  logger: logger.error,
});
