import { UserGroupScopeModel, UserGroupScopeAttributes } from '@entities/user-group-scope.model';
import { UserGroupScopeRepository } from '@repositories/user-group-scope.repository';
import { ServiceBase } from '@services/base/service-base';

export class UserGroupScopeService extends ServiceBase<UserGroupScopeModel, UserGroupScopeAttributes> {
  repository: UserGroupScopeRepository;
}
