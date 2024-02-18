import { WorkflowTaskAttributes, WorkflowTaskModel, getSchema } from '@entities/workflow-task.model';
import { Sequelize } from 'sequelize';
import { RepositoryBase } from './base/repository-base';

export class WorkflowTaskRepository extends RepositoryBase<WorkflowTaskModel, WorkflowTaskAttributes> {
  constructor(sequelize: Sequelize) {
    const schema = getSchema(sequelize);
    super(schema);
  }
}
