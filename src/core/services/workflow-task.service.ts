import { WorkflowTaskAttributes, WorkflowTaskModel } from '@entities/workflow-task.model';
import { WorkflowTaskRepository } from '@repositories/workflow-task.reporitory';
import { ServiceBase } from './base/service-base';

export class WorkflowTaskService extends ServiceBase<WorkflowTaskModel, WorkflowTaskAttributes> {
  repository: WorkflowTaskRepository;
}
