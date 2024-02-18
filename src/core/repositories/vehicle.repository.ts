import { VehicleAttributes, VehicleModel, getSchema } from '@entities/vehicle.model';
import { Sequelize } from 'sequelize';
import { RepositoryBase } from './base/repository-base';

export class VehicleRepository extends RepositoryBase<VehicleModel, VehicleAttributes> {
  constructor(sequelize: Sequelize) {
    const schema = getSchema(sequelize);
    super(schema);
  }
}
