import { AnalysisRepository } from '@repositories/analysis.repository';
import { DBConnectionManager } from '@repositories/base/db-connection-manager';
import { AnalysisService } from '@services/analysis.service';

export class AnalysisFactory {
  static createInstance() {
    const { sequelize } = DBConnectionManager.getInstance();
    const repository = new AnalysisRepository(sequelize);
    return new AnalysisService(repository);
  }
}
