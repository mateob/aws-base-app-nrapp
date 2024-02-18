import { SystemTable } from '@enums/system-table.enum';
import { IAttributesBase, IModelBase } from '@repositories/base/contracts-base';
import { DataTypes, ModelStatic, Sequelize } from 'sequelize';
import { defaultEntity, defaultOptions } from './utils/entity-util';

export interface OrderItemAttributes extends IAttributesBase {
  qunatity: number;
  itemName: string;
  orderId: string;
  totalPrice: number;
  customerId?: string;
  requesterId: string;
}
export interface OrderItemModel extends OrderItemAttributes, IModelBase {}
export function getSchema(sequelize: Sequelize): ModelStatic<OrderItemModel> {
  const tableName = SystemTable.ORDER_TYPE;
  return sequelize.define<OrderItemModel, OrderItemAttributes>(
    tableName,
    defaultEntity({
      name: { type: DataTypes.STRING, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      totalPrice: { type: DataTypes.DOUBLE, allowNull: false },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: SystemTable.ORDER, key: 'id' },
      },
      customerId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: SystemTable.USER, key: 'id' },
      },
      requesterId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: SystemTable.USER, key: 'id' },
      },
    }),
    defaultOptions(tableName),
  );
}
