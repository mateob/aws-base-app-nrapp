import { DBConnectionManager } from '@repositories/base/db-connection-manager';
import { CustomerDocumentRepository } from '@repositories/customer-document.repository';
import { CustomerDocumentService } from '@services/customer-document.service';

export class CustomerDocumentFactory {
  static createInstance() {
    const { sequelize } = DBConnectionManager.getInstance();
    const repository = new CustomerDocumentRepository(sequelize);
    return new CustomerDocumentService(repository);
  }
}
