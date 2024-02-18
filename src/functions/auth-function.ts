import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { AuthRequest, ChangePassword } from '@interfaces/auth-data.interface';
import { middyfy } from '@middlewares/middyfy';
import { ResponseHandler } from '@middlewares/status-handler';
import { RegisterNewUser } from '@entities/register-new-user.model';
import { JWTHelper } from '../config/utils/jwt-helper';
import { Policy } from '../config/utils/policy';
import logger from '../config/utils/logger';
import { AuthFactory } from '../core/factories/auth-factory';
import {
  authRequestValidator,
  changePasswordValidator,
  registerNewUserValidator,
} from '../core/validators/auth.validator';

export const token = middyfy(
  async (event: APIGatewayProxyEvent, _context: Context) => {
    try {
      const authRequest: AuthRequest = event.body as any;
      const jwtResponse = await AuthFactory.createInstance().login(authRequest);

      return ResponseHandler.ok(jwtResponse);
    } catch (error) {
      logger.error(error);
      return ResponseHandler.unauthorized();
    }
  },
  authRequestValidator,
);

export const validateToken = middyfy(
  async (event: APIGatewayProxyEvent, _context: Context) => {
    try {
      // const authRequest: AuthRequest = event.body as any;
      // deve verificar o token informado no header.
      // comparar o mesmo com o token contido na base de dados.
      // verificar se o exp dele e valido ainda.
      // caso sim, gerar um novo token e salvar o mesmo na base.
      const { Authorization } = event.headers;
      if (!JWTHelper.isValid(Authorization)) { return ResponseHandler.unauthorized(); }

      return ResponseHandler.ok();
    } catch (error) {
      logger.error(error);
      return ResponseHandler.unauthorized();
    }
  },
);

export const changePassword = middyfy(
  async (event: APIGatewayProxyEvent, _context: Context) => {
    try {
      const changeRequest: ChangePassword = event.body as any;
      await AuthFactory.createInstance().changePassword(changeRequest);

      return ResponseHandler.ok({ message: 'Password changes successfulle' });
    } catch (error) {
      logger.error(error);
      return ResponseHandler.unauthorized();
    }
  },
  changePasswordValidator,
);

/**
 * @description
 * Descrição da da chamada Validate
 * @example
 * Recebe os dados
 * @param event {any} Dados do evento API
 * @returns
 */
export const validate = async (event: any) => {
  // TODO: Entender o porque não esta passando por aqui
  const tokenValid = JWTHelper.isValid(event.authorizationToken);
  const effect = tokenValid ? 'Allow' : 'Deny';

  // eslint-disable-next-line no-shadow
  const jwtToken: any = JWTHelper.decode(event.authorizationToken);
  const data = jwtToken && jwtToken.data ? jwtToken.data : {};

  return Policy.generate('user', effect, event.methodArn, data);
};

export const registerNewUser = middyfy(
  async (event: APIGatewayProxyEvent, _context: Context) => {
    try {
      // Deve cadastrar o usuário e o cliente com os dados iniciais.
      const dataRegister: RegisterNewUser = event.body as any;
      await AuthFactory.createInstance().registerNewUser(dataRegister);

      return ResponseHandler.ok({ message: 'New user register success!' });
    } catch (error) {
      logger.error(error);
      return ResponseHandler.internalServerError();
    }
  },
  registerNewUserValidator,
);
