import { DBConnectionManager } from '../repositories/base/db-connection-manager';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';

export class UserFactory {
  static createInstance() {
    const { sequelize } = DBConnectionManager.getInstance();
    const repository = new UserRepository(sequelize);
    return new UserService(repository);
  }
}
