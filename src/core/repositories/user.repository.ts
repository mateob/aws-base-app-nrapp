import { RepositoryBase } from '@repositories/base/repository-base';
import { Sequelize, ModelStatic } from 'sequelize';
import { getSchema as getGroupSchema, UserGroupModel } from '@entities/user-group.model';
import { UserModel, UserAttributes, getSchema } from '@entities/user.model';

export class UserRepository extends RepositoryBase<UserModel, UserAttributes> {
  groupSchema: ModelStatic<UserGroupModel>;

  constructor(sequelize: Sequelize) {
    const schema = getSchema(sequelize);
    const userGroupSchema = getGroupSchema(sequelize);
    const groupAssociation = schema.hasOne(userGroupSchema, { foreignKey: 'userGroupId', as: 'userGroup' });

    super(schema, {
      select: [{ model: userGroupSchema, required: false, as: 'userGroup' }],
      create: [{ association: groupAssociation, as: 'userGroup' }],
    });
    this.groupSchema = userGroupSchema;
    this.attributeIgnoreFields = ['password'];
    this.defaultWhereFields = { internal: false };
  }
}
