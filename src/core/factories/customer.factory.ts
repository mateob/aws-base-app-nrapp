import { DBConnectionManager } from '@repositories/base/db-connection-manager';
import { CustomerRepository } from '@repositories/customer.repository';
import { CustomerService } from '@services/customer.service';

export class CustomerFactory {
  static createInstance() {
    const { sequelize } = DBConnectionManager.getInstance();
    const repository = new CustomerRepository(sequelize);
    return new CustomerService(repository);
  }
}
