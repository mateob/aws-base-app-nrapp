import { SystemTable } from '@enums/system-table.enum';
import { IAttributesBase, IModelBase } from '@repositories/base/contracts-base';
import { DataTypes, ModelStatic, Sequelize } from 'sequelize';
import { defaultEntity, defaultOptions } from './utils/entity-util';

export interface CustomerDriverQualifierAttributes extends IAttributesBase {
  customerId: string;
  description: string;
  file: string;
}
export interface CustomerDriverQualifierModel extends CustomerDriverQualifierAttributes, IModelBase { }
export function getCustomerDriverQualifierSchema(sequelize: Sequelize): ModelStatic<CustomerDriverQualifierModel> {
  const tableName = SystemTable.CUSTOMER_DRIVER_QUALIFIER;
  return sequelize.define<CustomerDriverQualifierModel, CustomerDriverQualifierAttributes>(
    tableName,
    defaultEntity({
      description: { type: DataTypes.STRING, allowNull: false },
      file: { type: DataTypes.STRING, allowNull: false },
      customerId: { type: DataTypes.UUIDV4, allowNull: false, references: { model: SystemTable.CUSTOMER, key: 'id' } },
    }),
    defaultOptions(tableName),
  );
}
