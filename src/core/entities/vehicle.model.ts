import { SystemTable } from '@enums/system-table.enum';
import { IAttributesBase, IModelBase } from '@repositories/base/contracts-base';
import { DataTypes, ModelStatic, Sequelize } from 'sequelize';
import { defaultEntity, defaultOptions } from './utils/entity-util';

export interface VehicleAttributes extends IAttributesBase {
  motorNumber?: number;
  chaciNumber?: number;
  plate: string;
  model: string;
  renavan: string;
  fabricateAt: Date;
  saleAt: Date;
  brand: string;
  carType: string;
  lastLicensingAt: Date;
  color: string;
  axes: number;
  observation: string;
}
export interface VehicleModel extends VehicleAttributes, IModelBase { }
export function getSchema(sequelize: Sequelize): ModelStatic<VehicleModel> {
  const tableName = SystemTable.VEHICLE;
  return sequelize.define<VehicleModel, VehicleAttributes>(
    tableName,
    defaultEntity({
      motorNumber: { type: DataTypes.NUMBER, allowNull: true },
      chaciNumber: { type: DataTypes.NUMBER, allowNull: true },
      plate: { type: DataTypes.STRING, allowNull: false },
      model: { type: DataTypes.STRING, allowNull: false },

      renavan: { type: DataTypes.STRING, allowNull: false },
      fabricateAt: { type: DataTypes.DATE, allowNull: false },
      saleAt: { type: DataTypes.DATE, allowNull: false },
      brand: { type: DataTypes.STRING, allowNull: false },
      carType: { type: DataTypes.STRING, allowNull: false },
      lastLicensingAt: { type: DataTypes.DATE, allowNull: false },

      color: { type: DataTypes.STRING, allowNull: false },
      axes: { type: DataTypes.NUMBER, allowNull: false },
      observation: { type: DataTypes.STRING, allowNull: false },
    }),
    defaultOptions(tableName),
  );
}
