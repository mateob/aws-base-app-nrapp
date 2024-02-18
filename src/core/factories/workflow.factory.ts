import { DBConnectionManager } from '@repositories/base/db-connection-manager';
import { WorkflowRepository } from '@repositories/workflow.repository';
import { WorkflowService } from '@services/workflow.service';

export class WorkflowFactory {
  static createInstance() {
    const { sequelize } = DBConnectionManager.getInstance();
    const repository = new WorkflowRepository(sequelize);
    return new WorkflowService(repository);
  }
}
