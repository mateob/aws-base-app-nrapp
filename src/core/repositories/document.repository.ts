import { DocumentAttributes, DocumentModel, getDocumentSchema } from '@entities/document.model';
import { Sequelize } from 'sequelize';
import { RepositoryBase } from './base/repository-base';

export class DocumentRepository extends RepositoryBase<DocumentModel, DocumentAttributes> {
  constructor(sequelize: Sequelize) {
    const schema = getDocumentSchema(sequelize);
    super(schema);
  }
}
