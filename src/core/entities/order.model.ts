import { SystemTable } from '@enums/system-table.enum';
import { IAttributesBase, IModelBase } from '@repositories/base/contracts-base';
import { DataTypes, ModelStatic, Sequelize } from 'sequelize';
import { OrderItemAttributes } from './order-item.model';
import { defaultEntity, defaultOptions } from './utils/entity-util';

export interface OrderAttributes extends IAttributesBase {
  number: string;
  status: string;
  startAt: Date;
  previusAt: Date;
  type: string;
  items: OrderItemAttributes[];
}
export interface OrderModel extends OrderAttributes, IModelBase {}
export function getSchema(sequelize: Sequelize): ModelStatic<OrderModel> {
  const tableName = SystemTable.ORDER;
  return sequelize.define<OrderModel, OrderAttributes>(
    tableName,
    defaultEntity({
      number: { type: DataTypes.UUID, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
      startAt: { type: DataTypes.DATE, allowNull: false },
      previusAt: { type: DataTypes.DATE, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
    }),
    defaultOptions(tableName),
  );
}
