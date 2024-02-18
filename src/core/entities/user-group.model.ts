import { SystemTable } from '@enums/system-table.enum';
import { Sequelize, DataTypes, ModelStatic } from 'sequelize';
import { IAttributesBase, IModelBase } from '../repositories/base/contracts-base';
import { UserGroupScopeAttributes } from './user-group-scope.model';
import { defaultOptions, defaultEntity } from './utils/entity-util';

export interface UserGroupAttributes extends IAttributesBase {
  name: string;
  description: string;
  userGroupType: string;
  scopes?: UserGroupScopeAttributes[];
}
export interface UserGroupModel extends UserGroupAttributes, IModelBase { }
export function getSchema(sequelize: Sequelize): ModelStatic<UserGroupModel> {
  const tableName = SystemTable.USER_GROUP;
  return sequelize.define<UserGroupModel, UserGroupAttributes>(
    tableName,
    defaultEntity({
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      userGroupType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }),
    defaultOptions(tableName),
  );
}
