import { SystemTable } from '@enums/system-table.enum';
import { IAttributesBase, IModelBase } from '@repositories/base/contracts-base';
import { DataTypes, ModelStatic, Sequelize } from 'sequelize';
import { defaultEntity, defaultOptions } from './utils/entity-util';

export interface CustomerDocumentAttributes extends IAttributesBase {
  docType: string;
  docNumber: string;
  docAt: Date;
  docValidateAt: Date;
  docData: string;
  customerId: string;
}
export interface CustomerDocumentModel extends CustomerDocumentAttributes, IModelBase { }
export function getCustomerDocumentSchema(sequelize: Sequelize): ModelStatic<CustomerDocumentModel> {
  const tableName = SystemTable.CUSTOMER_DOCUMENT;
  return sequelize.define<CustomerDocumentModel, CustomerDocumentAttributes>(
    tableName,
    defaultEntity({
      docType: { type: DataTypes.STRING, allowNull: false },
      docNumber: { type: DataTypes.STRING, allowNull: false },
      docAt: { type: DataTypes.DATE, allowNull: true },
      docValidateAt: { type: DataTypes.DATE, allowNull: true },
      docData: { type: DataTypes.STRING, allowNull: true },
      customerId: { type: DataTypes.UUIDV4, allowNull: false, references: { model: SystemTable.CUSTOMER, key: 'id' } },
    }),
    defaultOptions(tableName),
  );
}
