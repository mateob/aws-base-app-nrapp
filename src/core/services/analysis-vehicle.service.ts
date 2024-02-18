import { AnalysisVehicleAttributes, AnalysisVehicleModel } from '@entities/analysis-vehicle.model';
import { AnalysisVehicleRepository } from '@repositories/analysis-vehicle.repository';
import { RestrictionFactory } from '@factories/restriction.factory';
import { DocumentFactory } from '@factories/document.factory';
import { ServiceBase } from './base/service-base';

export class AnalysisVehicleService extends ServiceBase<AnalysisVehicleModel, AnalysisVehicleAttributes> {
  respository: AnalysisVehicleRepository;

  public async createOfAnalysis(item: AnalysisVehicleAttributes, analystUuid: string): Promise<AnalysisVehicleModel> {
    const { documents = [], restrictions = [], ...data } = item;
    const { dataValues } = await super.create({ ...data, analystUuid } as any);
    const restrictionList = RestrictionFactory.createInstance().createWithList(restrictions, '', dataValues.id);
    const documentList = DocumentFactory.createInstance().createWithList(documents, '', dataValues.id);
    return { ...dataValues, restrictions: restrictionList, documents: documentList };
  }
}
