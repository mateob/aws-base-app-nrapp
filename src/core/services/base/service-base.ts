/* eslint-disable max-classes-per-file */
import { IAttributesBase, IModelBase } from '@repositories/base/contracts-base';
import { RepositoryBase } from '@repositories/base/repository-base';

import {
  FindOptions, UpdateOptions, FindOrCreateOptions, Op,
} from 'sequelize';
import { StatusCodes } from 'http-status-codes';
import { CONTENT_TYPE_JSON } from '@constants/http.constants';
import { VALUE_NOT_FOUND } from '@constants/entity.constants';
import { ServiceChild } from '../../../config/types/service-child.type';

export abstract class ServiceBase<M extends IModelBase, A extends IAttributesBase> {
  repository: RepositoryBase<M, A>;

  protected childs: ServiceChild[] = [];

  constructor(repository: RepositoryBase<M, A>) {
    this.repository = repository;
  }

  public async findOrCreate(options: FindOrCreateOptions<M, A>): Promise<[M, boolean]> {
    return this.repository.findOrCreate(options);
  }

  public async findAll(options: FindOptions<M> = {}): Promise<M[]> {
    return this.repository.findAll(options);
  }

  public async findOne(id: string, filterActive: boolean = true): Promise<M> {
    return this.repository.findOne(id, filterActive);
  }

  public async create(item: A): Promise<M> {
    return this.repository.create(item as any);
  }

  public async update(item: Partial<A>, options: UpdateOptions<any>): Promise<[number, M[]]> {
    return this.repository.update(item, options);
  }

  public async destroy(id: string): Promise<[number]> {
    return this.repository.destroy({ where: { id: { [Op.eq]: id } } });
  }

  public async bloqued(id: string, status: boolean): Promise<void> {
    await this.updateById(id, { isBloqued: status } as Partial<A>, false);
  }

  public async updateById(
    id: string,
    item: Partial<A>,
    returnSelect: boolean = true,
    ignoreChilds: boolean = false,
    onlyCreate: boolean = false,
  ): Promise<M> {
    const result = await this.repository.updateById(id, item);
    if (result[0] === 0) {
      throw {
        statusCode: StatusCodes.NOT_FOUND,
        data: { errorMessage: VALUE_NOT_FOUND('Entidade') },
        contentType: CONTENT_TYPE_JSON,
      };
    }
    if (!ignoreChilds) {
      await this.updateChilds(item, id, onlyCreate);
    }
    return returnSelect ? this.repository.findById(id) : {} as any;
  }

  protected montFkId(id: string, fk: string): { [key: string]: string } {
    const owner = {};
    owner[`${fk}`] = id;
    return owner;
  }

  public async updateChilds(item: Partial<A>, fkId: string, onlyCreate: boolean = false) {
    if (this.childs.length) {
      // eslint-disable-next-line no-restricted-syntax
      for await (const child of this.childs) {
        if (item[child.field]) {
          if (Array.isArray(item[child.field]) && item[child.field].length) {
            // eslint-disable-next-line no-restricted-syntax
            for await (const childData of item[child.field].filter((i) => (onlyCreate ? !i.id : true))) {
              // Chamando pelo repository não efetua a consulta do FindById
              await this.updateOrCreateChild(childData, onlyCreate, child, fkId);
            }
          } else if (item[child.field] instanceof Object) {
            await this.updateOrCreateChild(item[child.field], onlyCreate, child, fkId);
          }
        }
      }
    }
  }

  /**
   * Name: UpdateOrCreateChild
   *
   * Calls: updateById, updateChilds, create, montFkId
   *
   * Description:
   * Método encarregado de processar o objeto de forma recursiva.
   *
   * Caso o objeto tenha o ID preenchido, e realizado um Update.
   * Após realizar o update, e verificado se o service contem um Child, caso sim, chama o método updateChilds do service informado pelo Child.
   *
   * Caso o objeto não tenha um ID, e realizado o Create do mesmo associando a FK pelo id informado no campo fkId.
   *
   * @param {any} data objeto a ser processado.
   * @param {boolean} onlyCreate utilizado somente para criação de objetos.
   * @param {ServiceChild} child objeto ServiceChild, informando os dados para processar objetos aninhados.
   * @param {string} fkId id do objeto owner
   */
  private async updateOrCreateChild(data: any, onlyCreate: boolean, child: ServiceChild, fkId: string) {
    if (data) {
      if (data.id) {
        await child.service.updateById(data.id, data, false);
        if (child.service.childs.length) {
          await child.service.updateChilds(data, data.id, onlyCreate);
        }
      } else {
        await child.service.create({ ...data, ...this.montFkId(fkId, child.fk) });
      }
    }
  }
}
