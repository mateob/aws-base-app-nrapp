import { Context } from 'aws-lambda';
import { AuthData } from './auth-data.interface';

export interface AppContext extends Context {
  authData: AuthData;
}
