import * as Joi from '@hapi/joi';
import middy from '@middy/core';
import httpEventNormalizer from '@middy/http-event-normalizer';
import jsonBodyParser from '@middy/http-json-body-parser';
import { apiLogger } from './api-logger';
import { attachAuthData } from './attach-auth-data';
import { errorHandler } from './error-handler';
import { joiValidator } from './joi-validator';
import { roteValidator } from './rote-validator';
import { stringifyResponse } from './stringify-response';

export const middyfy = (handler, validatorSchema?: Joi.ObjectSchema) => {
  const instance = middy(handler)
    .use(jsonBodyParser())
    .use(httpEventNormalizer())
    .use(apiLogger())
    .use(roteValidator());
  if (validatorSchema) {
    instance.use(joiValidator(validatorSchema));
  }
  instance
    .use(attachAuthData())
    .use(errorHandler())
    .use(stringifyResponse());
  return instance;
};
