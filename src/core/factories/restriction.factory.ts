import { DBConnectionManager } from '@repositories/base/db-connection-manager';
import { RestrictionRepository } from '@repositories/restriction.repository';
import { RestrictionService } from '@services/restriction.service';

export class RestrictionFactory {
  static createInstance() {
    const { sequelize } = DBConnectionManager.getInstance();
    const repository = new RestrictionRepository(sequelize);
    return new RestrictionService(repository);
  }
}
