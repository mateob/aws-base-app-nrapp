import { DBConnectionManager } from '@repositories/base/db-connection-manager';
import { RefreshTokenRepository } from '@repositories/refresh-token.repository';
import { RefreshTokenService } from '@services/refresh-token.service';

export class RefreshTokenFactory {
  static createInstance() {
    const { sequelize } = DBConnectionManager.getInstance();
    const repository = new RefreshTokenRepository(sequelize);
    return new RefreshTokenService(repository);
  }
}
