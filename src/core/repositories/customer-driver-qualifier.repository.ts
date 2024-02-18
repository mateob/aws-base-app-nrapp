import { CustomerDriverQualifierAttributes, CustomerDriverQualifierModel, getCustomerDriverQualifierSchema } from '@entities/customer-driver-qualifier.model';
import { Sequelize } from 'sequelize';
import { RepositoryBase } from './base/repository-base';

export class CustomerDriverQualifierRepository extends RepositoryBase<CustomerDriverQualifierModel, CustomerDriverQualifierAttributes> {
  constructor(sequelize: Sequelize) {
    const schema = getCustomerDriverQualifierSchema(sequelize);
    super(schema);
  }
}
