import { DataTypes, ModelStatic, Sequelize } from 'sequelize';
import { IAttributesBase, IModelBase } from '@repositories/base/contracts-base';
import { SystemTable } from '@enums/system-table.enum';
import { defaultEntity, defaultOptions } from './utils/entity-util';
import { WorkflowTaskAttributes } from './workflow-task.model';

export interface WorkflowAttributes extends IAttributesBase {
  uuid?: string,
  description?: string,
  status?: string,
  entityRef?: string,
  actionRef?: string,
  uuidRef?: string,
  analyst?: string,
  document?: string,
  customerName?: string,
  tasks?: WorkflowTaskAttributes[],
}
export interface WorkflowModel extends WorkflowAttributes, IModelBase { }
export function getSchema(sequelize: Sequelize): ModelStatic<WorkflowModel> {
  const tableName = SystemTable.WORKFLOW;
  return sequelize.define<WorkflowModel, WorkflowAttributes>(
    tableName,
    defaultEntity({
      uuid: { type: DataTypes.UUID, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
      entityRef: { type: DataTypes.STRING, allowNull: false },
      actionRef: { type: DataTypes.STRING, allowNull: false },
      uuidRef: { type: DataTypes.UUID, allowNull: false },
      analyst: { type: DataTypes.STRING, allowNull: false },
      document: { type: DataTypes.STRING, allowNull: false },
      customerName: { type: DataTypes.STRING, allowNull: false },
    }),
    defaultOptions(tableName),
  );
}
