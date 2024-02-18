import { AnalysisCustomerRepository } from '@repositories/analysis-customer.repository';
import { DBConnectionManager } from '@repositories/base/db-connection-manager';
import { AnalysisCustomerService } from '@services/analysis-customer.service';

export class AnalysisCustomerFactory {
  static createInstance() {
    const { sequelize } = DBConnectionManager.getInstance();
    const repository = new AnalysisCustomerRepository(sequelize);
    return new AnalysisCustomerService(repository);
  }
}
