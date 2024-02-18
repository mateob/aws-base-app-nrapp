interface IWorkflowType {
  type: string;
  description: string;
}

export class WorkflowTypeEnum {
  public static readonly IN_PROGRESS: IWorkflowType = {
    type: 'InProgress',
    description: 'Em Andamento',
  };

  public static readonly PENDING: IWorkflowType = {
    type: 'Pending',
    description: 'Pendente',
  };

  public static readonly PENDING_TO_APROVAL: IWorkflowType = {
    type: 'PendingToAproval',
    description: 'Pendente de aprovação',
  };

  public static readonly IN_ANALYSIS: IWorkflowType = {
    type: 'InAnalysis',
    description: 'Em Analisis',
  };

  public static readonly BLOQUED: IWorkflowType = {
    type: 'Bloqued',
    description: 'Bloqueado',
  };

  public static readonly FINISHED: IWorkflowType = {
    type: 'Finished',
    description: 'Finalizado',
  };
}
