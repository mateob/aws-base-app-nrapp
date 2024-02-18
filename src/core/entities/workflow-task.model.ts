import { SystemTable } from '@enums/system-table.enum';
import { IAttributesBase, IModelBase } from '@repositories/base/contracts-base';
import { DataTypes, ModelStatic, Sequelize } from 'sequelize';
import { defaultEntity, defaultOptions } from './utils/entity-util';

export interface WorkflowTaskAttributes extends IAttributesBase {
  refId: string;
  workflowUuid: string;
}
export interface WorkflowTaskModel extends WorkflowTaskAttributes, IModelBase { }
export function getSchema(sequelize: Sequelize): ModelStatic<WorkflowTaskModel> {
  const tableName = SystemTable.WORKFLOW_TASK;
  return sequelize.define<WorkflowTaskModel, WorkflowTaskAttributes>(
    tableName,
    defaultEntity({
      refId: { type: DataTypes.UUID, allowNull: false },
      workflowUuid: { type: DataTypes.UUID, allowNull: false },
    }),
    defaultOptions(tableName),
  );
}
