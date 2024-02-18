import { DBConnectionManager } from '@repositories/base/db-connection-manager';
import { WorkflowTaskRepository } from '@repositories/workflow-task.reporitory';
import { WorkflowTaskService } from '@services/workflow-task.service';

export class WorkflowTaskFactory {
  static createInstance() {
    const { sequelize } = DBConnectionManager.getInstance();
    const repository = new WorkflowTaskRepository(sequelize);
    return new WorkflowTaskService(repository);
  }
}
