import { SystemTable } from '@enums/system-table.enum';
import { IAttributesBase, IModelBase } from '@repositories/base/contracts-base';
import { DataTypes, ModelStatic, Sequelize } from 'sequelize';
import { defaultEntity, defaultOptions } from './utils/entity-util';
import { RestrictionAttributes } from './restriction.model';
import { DocumentAttributes } from './document.model';

export interface AnalysisCustomerAttributes extends IAttributesBase {
  uuidRef: string;
  analystUuid: string;
  containRestriction: boolean;
  restrictions?: RestrictionAttributes[];
  documents?: DocumentAttributes[];
}
export interface AnalysisCustomerModel extends AnalysisCustomerAttributes, IModelBase { }
export function getAnalysisCustomerSchema(sequelize: Sequelize): ModelStatic<AnalysisCustomerModel> {
  const tableName = SystemTable.ANALYSIS_CUSTOMER;
  return sequelize.define<AnalysisCustomerModel, AnalysisCustomerAttributes>(
    tableName,
    defaultEntity({
      uuidRef: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        references: { model: SystemTable.CUSTOMER, key: 'id' },
      },
      analystUuid: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        references: { model: SystemTable.ANALYSIS, key: 'id' },
      },
      containRestriction: { type: DataTypes.BOOLEAN, allowNull: false },
    }),
    defaultOptions(tableName),
  );
}
