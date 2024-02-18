import { RestrictionAttributes, RestrictionModel, getRestrictionSchema } from '@entities/restriction.model';
import { Sequelize } from 'sequelize';
import { RepositoryBase } from './base/repository-base';

export class RestrictionRepository extends RepositoryBase<RestrictionModel, RestrictionAttributes> {
  constructor(sequelize: Sequelize) {
    const schema = getRestrictionSchema(sequelize);
    super(schema);
  }
}
