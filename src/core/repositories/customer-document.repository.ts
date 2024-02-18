import { Sequelize } from 'sequelize';
import { CustomerDocumentAttributes, CustomerDocumentModel, getCustomerDocumentSchema } from '@entities/customer-document.model';
import { RepositoryBase } from './base/repository-base';

export class CustomerDocumentRepository extends RepositoryBase<CustomerDocumentModel, CustomerDocumentAttributes> {
  constructor(sequelize: Sequelize) {
    const schema = getCustomerDocumentSchema(sequelize);
    super(schema);
  }
}
