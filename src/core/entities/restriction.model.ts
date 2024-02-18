import { SystemTable } from '@enums/system-table.enum';
import { IAttributesBase, IModelBase } from '@repositories/base/contracts-base';
import { DataTypes, ModelStatic, Sequelize } from 'sequelize';
import { defaultEntity, defaultOptions } from './utils/entity-util';

export interface RestrictionAttributes extends IAttributesBase {
  restrictionType: string;
  description: string;
  gravity: string;
  analysisCustomerUuid?: string;
  analysisVehicleUuid?: string;
}
export interface RestrictionModel extends RestrictionAttributes, IModelBase { }
export function getRestrictionSchema(sequelize: Sequelize): ModelStatic<RestrictionModel> {
  const tableName = SystemTable.RESTRICTION;
  return sequelize.define<RestrictionModel, RestrictionAttributes>(
    tableName,
    defaultEntity({
      restrictionType: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      gravity: { type: DataTypes.STRING, allowNull: false },
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
