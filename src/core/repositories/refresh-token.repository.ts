import { RefreshTokenAttributes, RefreshTokenModel, getSchema } from '@entities/refresh-token.model';
import { Sequelize } from 'sequelize';
import { RepositoryBase } from './base/repository-base';

export class RefreshTokenRepository extends RepositoryBase<RefreshTokenModel, RefreshTokenAttributes> {
  constructor(sequelize: Sequelize) {
    const schema = getSchema(sequelize);

    super(schema);
  }
}
