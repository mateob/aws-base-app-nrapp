import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import logger from '../../config/utils/logger';

export const apiLogger = () => {
  const apiLoggerBefore = async (request: middy.Request<APIGatewayProxyEvent>) => {
    let log = `Request ${request.event.httpMethod}:${request.event.path}\n`;
    if (request.event.queryStringParameters && Object.keys(request.event.queryStringParameters).length > 0) {
      const queryStrings = [];
      Object.keys(request.event.queryStringParameters).forEach((qs) => {
        queryStrings.push(`${qs}=${request.event.queryStringParameters[qs]}`);
      });
      log += `\tQueryStrings: ${queryStrings.join('&')}\n`;
    }
    if (request.event.pathParameters && Object.keys(request.event.pathParameters).length > 0) {
      const pathParameters = [];
      Object.keys(request.event.pathParameters).forEach((pp) => {
        pathParameters.push(`${pp}=${request.event.pathParameters[pp]}`);
      });
      log += `\tPathParameters: ${pathParameters.join('&')}\n`;
    }
    if (request.event.body && Object.keys(request.event.body).length > 0) {
      log += `\tBody: ${JSON.stringify(Object.keys(request.event.body).reduce((target: any, key) => {
        if (key !== 'password') {
          target[key] = request.event.body[key];
        }
        return target;
      }, {}))}`;
    }
    logger.info(log);
  };
  const apiLoggerAfter = async (request: middy.Request<APIGatewayProxyEvent>) => {
    let log = `Response ${request.event.httpMethod}:${request.event.path}\n`;
    log += `\tStatusCode: ${request.response.statusCode}`;
    if (request.response.body) {
      log += `\n\tBody: ${request.response.body}`;
    }
    logger.info(log);
  };
  return {
    before: apiLoggerBefore,
    after: apiLoggerAfter,
  };
};
