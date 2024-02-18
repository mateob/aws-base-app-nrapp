import { SystemTable } from '@enums/system-table.enum';
import { IAttributesBase, IModelBase } from '@repositories/base/contracts-base';
import { DataTypes, ModelStatic, Sequelize } from 'sequelize';
import { defaultEntity, defaultOptions } from './utils/entity-util';

export interface DocumentAttributes extends IAttributesBase {
  analysisCustomerUuid?: string;
  analysisVehicleUuid?: string;
}
export interface DocumentModel extends DocumentAttributes, IModelBase { }
export function getDocumentSchema(sequelize: Sequelize): ModelStatic<DocumentModel> {
  const tableName = SystemTable.DOCUMENTATION;
  return sequelize.define<DocumentModel, DocumentAttributes>(
    tableName,
    defaultEntity({
      analysisCustomerUuid: {
        type: DataTypes.UUIDV4,
        allowNull: true,
        references: { model: SystemTable.ANALYSIS_CUSTOMER, key: 'id' },
      },
      analysisVehicleUuid: {
        type: DataTypes.UUIDV4,
        allowNull: true,
        references: { model: SystemTable.ANALYSIS_VEHICLE, key: 'id' },
      },
    }),
    defaultOptions(tableName),
  );
}
