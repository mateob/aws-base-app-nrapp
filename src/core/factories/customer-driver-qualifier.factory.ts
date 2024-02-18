import { DBConnectionManager } from '@repositories/base/db-connection-manager';
import { CustomerDriverQualifierRepository } from '@repositories/customer-driver-qualifier.repository';
import { CustomerDriverQualifierService } from '@services/customer-driver-qualifier.service';

export class CustomerDriverQualifierFactory {
  static createInstance() {
    const { sequelize } = DBConnectionManager.getInstance();
    const repository = new CustomerDriverQualifierRepository(sequelize);
    return new CustomerDriverQualifierService(repository);
  }
}
