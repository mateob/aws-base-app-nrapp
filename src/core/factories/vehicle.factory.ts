import { DBConnectionManager } from '@repositories/base/db-connection-manager';
import { VehicleRepository } from '@repositories/vehicle.repository';
import { VehicleService } from '@services/vehicle.service';

export class VehicleFactory {
  static createInstance() {
    const { sequelize } = DBConnectionManager.getInstance();
    const repository = new VehicleRepository(sequelize);
    return new VehicleService(repository);
  }
}
