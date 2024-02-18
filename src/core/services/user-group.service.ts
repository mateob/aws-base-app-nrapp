import { ServiceBase } from './base/service-base';
import { UserGroupModel, UserGroupAttributes } from '../entities/user-group.model';
import { UserGroupRepository } from '../repositories/user-group.repository';

export class UserGroupService extends ServiceBase<UserGroupModel, UserGroupAttributes> {
  repository: UserGroupRepository;
}
