/* eslint-disable no-unused-vars */
import {
  FindOptions, FindOrCreateOptions, Model, UpdateOptions,
} from 'sequelize';

export interface IModelBase extends Model { }
export interface IAttributesBase {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isBloqued?: boolean;
  active?: boolean;
}

export interface ITableNameInfo {
  tableName: string;
  schema: string;
  delimiter: string;
}

export interface IReadOperations<M extends IModelBase> {
  getTableName(): string | ITableNameInfo;
  findAll(options: FindOptions, filterActive: boolean): Promise<M[]>;
  findOne(id: string, filterActive: boolean): Promise<M>;
  findOneQuery(options: FindOptions, filterActive: boolean): Promise<M>;
  findById(id: string): Promise<M>;
  findOrCreate(options: FindOrCreateOptions): Promise<[M, boolean]>;
}

export interface IWriteOperations<M extends IModelBase, A extends IAttributesBase> {
  create(item: A): Promise<M>;
  update(item: Partial<A>, options: UpdateOptions): Promise<[number, M[]]>;
  updateById(id: string, item: Partial<A>): Promise<[number, M[]]>;
  destroy(options: UpdateOptions): Promise<[number]>;
  bloqued(id: string, status: boolean): Promise<void>;
}
