import {
  FindOrCreateOptions,
  FindOptions,
  UpdateOptions,
  ModelStatic,
  Includeable,
  IncludeOptions,
  Op,
} from 'sequelize';
import {
  IModelBase,
  IAttributesBase,
  IReadOperations,
  IWriteOperations,
  ITableNameInfo,
} from '@repositories/base/contracts-base';
import { v4 as uuid } from 'uuid';

export abstract class RepositoryBase<M extends IModelBase, A extends IAttributesBase> implements IReadOperations<M>, IWriteOperations<M, A> {
  schema: ModelStatic<M>;

  private selectIncludes: Includeable[];

  private createIncludes: Includeable[];

  protected attributeIgnoreFields: string[] = [];

  protected defaultWhereFields: any = {};

  constructor(
    schema: ModelStatic<M>,
    options: {
      select?: Includeable[],
      create?: Includeable[]
    } = { select: [], create: [] },
  ) {
    this.schema = schema;
    this.selectIncludes = options.select || [];
    this.createIncludes = options.create || [];
  }

  public async bloqued(_id: string, _status: boolean): Promise<void> {
    // implementar o bloquedio desbloqueio

  }

  /** PUBLIC METHODS */

  public getTableName(): string | ITableNameInfo {
    return this.schema.getTableName();
  }

  public findOrCreate(options: FindOrCreateOptions<M, A>): Promise<[M, boolean]> {
    options.defaults.id = options.defaults.id ?? uuid();
    options.attributes = this.applyIgnoreFields();
    return this.schema.findOrCreate(options as any);
  }

  public findAll(options: FindOptions<M>): Promise<M[]> {
    return this.schema.findAll(options);
  }

  public findOne(id: string, filterActive: boolean): Promise<M> {
    const allOptions = {
      where: { id: { [Op.eq]: id } },
      include: this.applyActive(this.selectIncludes, filterActive),
      attributes: this.applyIgnoreFields(),
    };
    return this.schema.findOne(allOptions);
  }

  public findOneQuery(options: FindOptions, filterActive: boolean): Promise<M> {
    const allOptions = {
      ...options,
      include: this.applyActive(this.selectIncludes, filterActive),
      attributes: this.applyIgnoreFields(),
    };
    return this.schema.findOne(allOptions);
  }

  public findById(id: string): Promise<M> {
    return this.schema.findByPk(id, {
      include: this.selectIncludes,
      attributes: this.applyIgnoreFields(),
    });
  }

  public create(item: A): Promise<M> {
    item.id = item.id ?? uuid();
    return this.schema.create(item as any, { include: this.createIncludes });
  }

  public update(item: Partial<A>, options: UpdateOptions<any>): Promise<[number, M[]]> {
    return this.schema.update(item, { ...options, returning: true });
  }

  public updateById(id: string, item: Partial<A>): Promise<[number, M[]]> {
    return this.schema.update(item, { where: { id } as any, returning: true });
  }

  public destroy(options: UpdateOptions<any>): Promise<[number]> {
    return this.schema.update({ active: false }, options);
  }

  /** PROTECTED METHODS */

  protected applyIgnoreFields(): string[] {
    return Object
      .keys(this.schema.rawAttributes)
      .filter((field) => !this.attributeIgnoreFields.includes(field));
  }

  protected applyActive(include: Includeable[], filterActive: boolean): Includeable[] {
    return include.map((inc: IncludeOptions) => {
      if (filterActive) {
        inc.where = { ...inc.where, active: filterActive };
      }

      if (inc.include && inc.include.length) {
        inc.include = this.applyActive(inc.include, filterActive);
      }
      return inc;
    });
  }

  /** PRIVATE METHODS */
}
