import { SystemTable } from '@enums/system-table.enum';
import { IAttributesBase, IModelBase } from '@repositories/base/contracts-base';
import { DataTypes, ModelStatic, Sequelize } from 'sequelize';
import { defaultEntity, defaultOptions } from './utils/entity-util';

export interface NotificationAttributes extends IAttributesBase {
  token?: string;
  customerId?: string;
  type?: string;
  device?: string;
}
export interface NotificationModel extends NotificationAttributes, IModelBase { }
export function getNotificationSchema(sequelize: Sequelize): ModelStatic<NotificationModel> {
  const tableName = SystemTable.NOTIFICATION;
  return sequelize.define<NotificationModel, NotificationAttributes>(
    tableName,
    defaultEntity({
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customerId: {
        type: DataTypes.UUIDV4,
        allowNull: true,
        references: { model: SystemTable.CUSTOMER, key: 'id' },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      device: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }),
    defaultOptions(tableName),
  );
}
