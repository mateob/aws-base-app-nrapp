import { AnalysisCustomerAttributes, AnalysisCustomerModel } from '@entities/analysis-customer.model';
import { AnalysisCustomerRepository } from '@repositories/analysis-customer.repository';
import { RestrictionFactory } from '@factories/restriction.factory';
import { DocumentFactory } from '@factories/document.factory';
import { ServiceBase } from './base/service-base';

export class AnalysisCustomerService extends ServiceBase<AnalysisCustomerModel, AnalysisCustomerAttributes> {
  respository: AnalysisCustomerRepository;

  public async createOfAnalysis(item: AnalysisCustomerAttributes, analystUuid: string): Promise<AnalysisCustomerModel> {
    const { documents = [], restrictions = [], ...data } = item;
    const { dataValues } = await super.create({ ...data, analystUuid } as any);
    const restrictionList = await RestrictionFactory.createInstance().createWithList(restrictions, dataValues.id);
    const documentList = await DocumentFactory.createInstance().createWithList(documents, dataValues.id);
    return { ...dataValues, restrictions: restrictionList, documents: documentList };
  }
}
