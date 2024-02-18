import { UserRepository } from '@repositories/user.repository';
import { ServiceBase } from './base/service-base';
import { UserModel, UserAttributes } from '../entities/user.model';

export class UserService extends ServiceBase<UserModel, UserAttributes> {
  repository: UserRepository;
}
