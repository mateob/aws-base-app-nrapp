import { CustomerAttributes, CustomerModel, getSchema } from '@entities/customer.model';
import { ModelStatic, Sequelize } from 'sequelize';
import { CustomerDriverQualifierModel, getCustomerDriverQualifierSchema } from '@entities/customer-driver-qualifier.model';
import { CustomerDocumentModel, getCustomerDocumentSchema } from '@entities/customer-document.model';
import { RepositoryBase } from './base/repository-base';

export class CustomerRepository extends RepositoryBase<CustomerModel, CustomerAttributes> {
  customerDriverQualifierSchema: ModelStatic<CustomerDriverQualifierModel>;

  customerDocumentSchema: ModelStatic<CustomerDocumentModel>;

  constructor(sequelize: Sequelize) {
    const schema = getSchema(sequelize);
    const customerDriverQualifierSchema = getCustomerDriverQualifierSchema(sequelize);
    const customerDriverQualifierAssociation = schema.hasMany(customerDriverQualifierSchema, { foreignKey: 'customerId', as: 'qualifiers' });

    const customerDocumentSchema = getCustomerDocumentSchema(sequelize);
    const customerDocumentAssociation = schema.hasMany(customerDocumentSchema, { foreignKey: 'customerId', as: 'documents' });

    super(schema, {
      select: [
        { model: customerDriverQualifierSchema, required: false, as: 'qualifiers' },
        { model: customerDocumentSchema, required: false, as: 'documents' },
      ],
      create: [
        { association: customerDriverQualifierAssociation, as: 'qualifiers' },
        { association: customerDocumentAssociation, as: 'documents' },
      ],
    });
    this.customerDriverQualifierSchema = customerDriverQualifierSchema;
    this.customerDocumentSchema = customerDocumentSchema;
  }
}
