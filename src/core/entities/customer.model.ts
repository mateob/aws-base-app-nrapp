import { SystemTable } from '@enums/system-table.enum';
import { IAttributesBase, IModelBase } from '@repositories/base/contracts-base';
import { Sequelize, ModelStatic, DataTypes } from 'sequelize';
import { defaultEntity, defaultOptions } from './utils/entity-util';
import { CustomerDocumentAttributes } from './customer-document.model';
import { CustomerDriverQualifierAttributes } from './customer-driver-qualifier.model';

export interface CustomerAttributes extends IAttributesBase {
  name: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  bithDate: Date;
  type: number;
  documents: CustomerDocumentAttributes[];
  qualifiers: CustomerDriverQualifierAttributes[];
}
export interface CustomerModel extends CustomerAttributes, IModelBase { }
export function getSchema(sequelize: Sequelize): ModelStatic<CustomerModel> {
  const tableName = SystemTable.CUSTOMER;
  return sequelize.define<CustomerModel, CustomerAttributes>(
    tableName,
    defaultEntity({
      name: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      document: { type: DataTypes.STRING, allowNull: false },
      bithDate: { type: DataTypes.DATE, allowNull: false },
      type: { type: DataTypes.NUMBER, allowNull: false },
    }),
    defaultOptions(tableName),
  );
}
