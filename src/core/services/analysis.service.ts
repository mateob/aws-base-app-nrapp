import { AnalysisAttributes, AnalysisModel } from '@entities/analysis.model';
import { AnalysisRepository } from '@repositories/analysis.repository';
import { AuthData } from '@interfaces/auth-data.interface';
import { StatusAnalysisEnum } from '../enums/status-analysis.enum';
import { ServiceBase } from './base/service-base';

export class AnalysisService extends ServiceBase<AnalysisModel, AnalysisAttributes> {
  repository: AnalysisRepository;

  public async assign(item: AnalysisAttributes, _userData: AuthData): Promise<AnalysisModel> {
    const { id, ...rest } = item;
    return this.updateById(id, rest);
  }

  public async updateStatus(uuid: string, status: StatusAnalysisEnum): Promise<AnalysisModel> {
    const data: Partial<AnalysisModel> = { status } as any;
    return this.updateById(uuid, data);
  }

  public async cancel(_uuid: string): Promise<void> {
    console.log();
  }
}
