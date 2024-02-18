import { DBConnectionManager } from '../repositories/base/db-connection-manager';
import { UserGroupRepository } from '../repositories/user-group.repository';
import { UserGroupService } from '../services/user-group.service';

export class UserGroupFactory {
  static createInstance() {
    const { sequelize } = DBConnectionManager.getInstance();
    const repository = new UserGroupRepository(sequelize);
    return new UserGroupService(repository);
  }
}
