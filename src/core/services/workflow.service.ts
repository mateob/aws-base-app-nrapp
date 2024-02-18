import { WorkflowAttributes, WorkflowModel } from '@entities/workflow.model';
import { WorkflowRepository } from '@repositories/workflow.repository';
import { ServiceBase } from './base/service-base';

export class WorkflowService extends ServiceBase<WorkflowModel, WorkflowAttributes> {
  repository: WorkflowRepository;

  public async assign(agentUuid: string, workflowUuid: string): Promise<void> {
    await this.updateById(workflowUuid, { analyst: agentUuid });
  }
}

/**
 * Workflow -> WorkflowTask -> Analisis Status/Step
 */
