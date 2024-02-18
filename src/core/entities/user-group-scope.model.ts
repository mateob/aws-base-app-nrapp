import { SystemTable } from '@enums/system-table.enum';
import { Sequelize, DataTypes, ModelStatic } from 'sequelize';
import { IAttributesBase, IModelBase } from '../repositories/base/contracts-base';
import { defaultEntity, defaultOptions } from './utils/entity-util';

export interface UserGroupScopeAttributes extends IAttributesBase {
  route: string;
  access: string;
  userGroupId: string;
}
export interface UserGroupScopeModel extends UserGroupScopeAttributes, IModelBase { }
export function getSchema(sequelize: Sequelize): ModelStatic<UserGroupScopeModel> {
  const tableName = SystemTable.USER_GROUP_SCOPE;
  return sequelize.define<UserGroupScopeModel, UserGroupScopeAttributes>(
    tableName,
    defaultEntity({
      route: { type: DataTypes.STRING, allowNull: false },
      access: { type: DataTypes.STRING, allowNull: false },
      userGroupId: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        references: { model: SystemTable.USER_GROUP, key: 'id' },
      },
    }),
    defaultOptions(tableName),
  );
}
