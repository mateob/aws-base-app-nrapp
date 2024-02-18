import { Sequelize } from 'sequelize';
import { UserGroupScopeModel, UserGroupScopeAttributes, getSchema } from '@entities/user-group-scope.model';
import { RepositoryBase } from './base/repository-base';

export class UserGroupScopeRepository extends RepositoryBase<UserGroupScopeModel, UserGroupScopeAttributes> {
  constructor(sequelize: Sequelize) {
    const schema = getSchema(sequelize);
    super(schema);
  }
}
