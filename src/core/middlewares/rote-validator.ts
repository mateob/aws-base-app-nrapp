import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { JWTHelper } from '../../config/utils/jwt-helper';
import { SCOPE_SEPARATOR } from '../constants/configuration.constants';
import { VerbToAction } from '../enums/action-type-verb.enum';
import { AuthData } from '../interfaces/auth-data.interface';

export const roteValidator = () => {
  const roteValidatorBefore = async (request: middy.Request<APIGatewayProxyEvent>) => {
    // console.log(request);
    if (request.event.headers.Authorization) {
      const {
        headers: { Authorization },
        httpMethod,
        resource,
      } = request.event;
      // TODO: Implementar uma logica melhor para validar endpoints publicos.
      if (!resource.includes('TOKEN')) {
        const tokenData = JWTHelper.decode(Authorization);
        if (tokenData && tokenData.data) {
          const { roles = '' } = tokenData.data as AuthData;
          if (!roles.split(SCOPE_SEPARATOR).some((role) => role.split(':')[0].toLowerCase() === resource.split('/')[1].toLowerCase()
            && role.split(':')[1].toLowerCase() === VerbToAction[httpMethod])) {
            throw { statusCode: StatusCodes.UNAUTHORIZED, body: 'User unauthorized' };
          } else {
            Object.assign(request, { userType: tokenData.data.userType });
          }
        }
      }
    }
  };
  return { before: roteValidatorBefore };
};
