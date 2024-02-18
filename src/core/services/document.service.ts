import { DocumentAttributes, DocumentModel } from '@entities/document.model';
import { DocumentRepository } from '@repositories/document.repository';
import { ServiceBase } from './base/service-base';

export class DocumentService extends ServiceBase<DocumentModel, DocumentAttributes> {
  repository: DocumentRepository;

  public async createWithList(
    items: DocumentAttributes[],
    analysisCustomerUuid?: string,
    analysisVehicleUuid?: string,
  ): Promise<DocumentModel[]> {
    if (Array.isArray(items) && !items.length) return [];
    const resultList: DocumentModel[] = [];
    const dataResult = await Promise.all(
      items.map(async (item) => this.create({
        ...item,
        analysisCustomerUuid,
        analysisVehicleUuid,
      } as any)),
    );

    dataResult.forEach((item) => {
      const { dataValues } = item;
      resultList.push(dataValues);
    });
    return resultList;
  }
}
