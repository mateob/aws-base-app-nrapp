import { SystemTable } from '@enums/system-table.enum';
import { IAttributesBase, IModelBase } from '@repositories/base/contracts-base';
import { DataTypes, ModelStatic, Sequelize } from 'sequelize';
import { StatusAnalysisEnum } from '@enums/status-analysis.enum';
import { defaultEntity, defaultOptions } from './utils/entity-util';
import { AnalysisCustomerAttributes } from './analysis-customer.model';
import { AnalysisVehicleAttributes } from './analysis-vehicle.model';

export interface AnalysisAttributes extends IAttributesBase {
  status: StatusAnalysisEnum;
  analysisCustomer?: AnalysisCustomerAttributes;
  analysisVehicle?: AnalysisVehicleAttributes;
}
export interface AnalysisModel extends AnalysisAttributes, IModelBase { }
export function getSchema(sequelize: Sequelize): ModelStatic<AnalysisModel> {
  const tableName = SystemTable.ANALYSIS;
  return sequelize.define<AnalysisModel, AnalysisAttributes>(
    tableName,
    defaultEntity({
      status: { type: DataTypes.STRING, allowNull: false },
    }),
    defaultOptions(tableName),
  );
}
