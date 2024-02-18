import { AuthData } from '@interfaces/auth-data.interface';
import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { JWTHelper } from '../../config/utils/jwt-helper';

export const attachAuthData = () => {
  const attachAuthDataBefore = async (request: middy.Request<APIGatewayProxyEvent>) => {
    if (request.event.headers.Authorization) {
      const tokenData = JWTHelper.decode(request.event.headers.Authorization);
      if (tokenData && tokenData.data) {
        Object.assign(request.context, {
          authData: tokenData.data as AuthData,
        });
      }
    }
  };
  return { before: attachAuthDataBefore };
};
