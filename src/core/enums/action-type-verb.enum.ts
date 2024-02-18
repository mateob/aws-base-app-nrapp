/* eslint-disable no-unused-vars */
export enum ActionTypeVerb {
  SELECT = 'select',
  CREATE = 'create',
  UPDATE = 'update',
  REMOVE = 'remove'
}

export enum VerbToAction {
  GET = ActionTypeVerb.SELECT,
  POST = ActionTypeVerb.CREATE,
  PUT = ActionTypeVerb.UPDATE,
  DELETE = ActionTypeVerb.REMOVE
}

export enum TypeVerb {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}
