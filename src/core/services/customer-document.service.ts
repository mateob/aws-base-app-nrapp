import { CustomerDocumentAttributes, CustomerDocumentModel } from '@entities/customer-document.model';
import { CustomerDocumentRepository } from '@repositories/customer-document.repository';
import { ServiceBase } from './base/service-base';

export class CustomerDocumentService extends ServiceBase<CustomerDocumentModel, CustomerDocumentAttributes> {
  repository: CustomerDocumentRepository;
}
