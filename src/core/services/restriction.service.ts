import { RestrictionAttributes, RestrictionModel } from '@entities/restriction.model';
import { RestrictionRepository } from '@repositories/restriction.repository';
import { Op } from 'sequelize';
import { ServiceBase } from './base/service-base';

export class RestrictionService extends ServiceBase<RestrictionModel, RestrictionAttributes> {
  repository: RestrictionRepository;

  public async createWithList(
    items: RestrictionAttributes[],
    analysisCustomerUuid?: string,
    analysisVehicleUuid?: string,
  ): Promise<RestrictionModel[]> {
    if (Array.isArray(items) && !items.length) return [];
    const resultList: RestrictionModel[] = [];
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

  public async findByAnalysis(analysisUuid: string): Promise<RestrictionModel[]> {
    console.log('----> Fez o find', analysisUuid);
    return this.findAll({ where: { [Op.or]: { analysisCustomerUuid: analysisUuid, analysisVehicleUuid: analysisUuid } } });
  }
}
