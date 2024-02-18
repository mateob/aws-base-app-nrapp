import { CustomerDriverQualifierAttributes, CustomerDriverQualifierModel } from '@entities/customer-driver-qualifier.model';
import { CustomerDriverQualifierRepository } from '../repositories/customer-driver-qualifier.repository';
import { ServiceBase } from './base/service-base';

export class CustomerDriverQualifierService extends ServiceBase<CustomerDriverQualifierModel, CustomerDriverQualifierAttributes> {
  repository: CustomerDriverQualifierRepository;
}
