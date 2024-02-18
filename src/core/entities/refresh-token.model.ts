import { SystemTable } from '@enums/system-table.enum';
import { IAttributesBase, IModelBase } from '@repositories/base/contracts-base';
import { DataTypes, ModelStatic, Sequelize } from 'sequelize';
import { defaultEntity, defaultOptions } from './utils/entity-util';

export interface RefreshTokenAttributes extends IAttributesBase {
  token: string;
}
export interface RefreshTokenModel extends RefreshTokenAttributes, IModelBase { }
export function getSchema(sequelize: Sequelize): ModelStatic<RefreshTokenModel> {
  const tableName = SystemTable.REFRESH_TOKEN;
  return sequelize.define<RefreshTokenModel, RefreshTokenAttributes>(
    tableName,
    defaultEntity({
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }),
    defaultOptions(tableName),
  );
}
