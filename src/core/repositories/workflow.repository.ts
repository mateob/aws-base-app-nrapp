import { WorkflowAttributes, WorkflowModel, getSchema } from '@entities/workflow.model';
import { ModelStatic, Sequelize } from 'sequelize';
import { WorkflowTaskModel, getSchema as getWorkflowTaskSchema } from '@entities/workflow-task.model';
import { RepositoryBase } from './base/repository-base';

export class WorkflowRepository extends RepositoryBase<WorkflowModel, WorkflowAttributes> {
  workflowTaskSchema: ModelStatic<WorkflowTaskModel>;

  constructor(sequelize: Sequelize) {
    const schema = getSchema(sequelize);
    const workflowTaskSchema = getWorkflowTaskSchema(sequelize);
    const workflowAssociation = schema.hasMany(workflowTaskSchema, { foreignKey: 'workflowUuid', as: 'tasks' });

    super(schema, {
      select: [{ model: workflowTaskSchema, required: false, as: 'tasks' }],
      create: [{ association: workflowAssociation, as: 'tasks' }],
    });
    this.workflowTaskSchema = workflowTaskSchema;
  }
}
