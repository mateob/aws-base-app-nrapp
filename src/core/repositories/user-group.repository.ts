import { ModelStatic, Sequelize } from 'sequelize';
import { getSchema as getScopeSchema, UserGroupScopeModel } from '@entities/user-group-scope.model';
import { UserGroupModel, UserGroupAttributes, getSchema } from '@entities/user-group.model';
import { RepositoryBase } from './base/repository-base';

export class UserGroupRepository extends RepositoryBase<UserGroupModel, UserGroupAttributes> {
  scopeSchema: ModelStatic<UserGroupScopeModel>;

  constructor(sequelize: Sequelize) {
    const schema = getSchema(sequelize);
    const scopeSchema = getScopeSchema(sequelize);
    const scopeAssociation = schema.hasMany(scopeSchema, { foreignKey: 'userGroupId', as: 'scopes' });

    super(schema, {
      select: [{ model: scopeSchema, required: false, as: 'scopes' }],
      create: [{ association: scopeAssociation, as: 'scopes' }],
    });
    this.scopeSchema = scopeSchema;
  }
}
