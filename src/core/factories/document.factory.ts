import { DBConnectionManager } from '@repositories/base/db-connection-manager';
import { DocumentRepository } from '@repositories/document.repository';
import { DocumentService } from '@services/document.service';

export class DocumentFactory {
  static createInstance() {
    const { sequelize } = DBConnectionManager.getInstance();
    const repository = new DocumentRepository(sequelize);
    return new DocumentService(repository);
  }
}
