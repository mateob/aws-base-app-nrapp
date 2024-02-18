import { Sequelize, ModelStatic, DataTypes } from 'sequelize';
import { SystemTable } from '@enums/system-table.enum';
import { UserTypeEnum } from '@enums/user-type.enum';
import { Password } from '../../config/utils/password';
import {
  IAttributesBase,
  IModelBase,
} from '../repositories/base/contracts-base';
import { defaultEntity, defaultOptions } from './utils/entity-util';
import { UserGroupAttributes } from './user-group.model';

export interface UserAttributes extends IAttributesBase {
  name: string;
  userName: string;
  password: string;
  internal: boolean;
  userGroupId: string;
  customerId: string;
  userType: string;
  userGroup?: UserGroupAttributes;
}
export interface UserModel extends UserAttributes, IModelBase { }
export function getSchema(sequelize: Sequelize): ModelStatic<UserModel> {
  const tableName = SystemTable.USER;
  return sequelize.define<UserModel, UserAttributes>(
    tableName,
    defaultEntity({
      name: { type: DataTypes.STRING, allowNull: false },
      userName: { type: DataTypes.STRING, allowNull: false },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue('password', Password.encode(value));
        },
      },
      internal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      customerId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: SystemTable.CUSTOMER, key: 'id' },
      },
      userGroupId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: SystemTable.USER_GROUP, key: 'id' },
      },
      userType: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: UserTypeEnum.FINAL,
      },
    }),
    defaultOptions(tableName),
  );
}
