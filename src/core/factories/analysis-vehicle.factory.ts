import { AnalysisVehicleRepository } from '@repositories/analysis-vehicle.repository';
import { DBConnectionManager } from '@repositories/base/db-connection-manager';
import { AnalysisVehicleService } from '@services/analysis-vehicle.service';

export class AnalysisVehicleFactory {
  static createInstance() {
    const { sequelize } = DBConnectionManager.getInstance();
    const repository = new AnalysisVehicleRepository(sequelize);
    return new AnalysisVehicleService(repository);
  }
}
