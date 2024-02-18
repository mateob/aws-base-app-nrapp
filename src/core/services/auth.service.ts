import { Op } from 'sequelize';
import { UserFactory } from '@factories/user.factory';
import { UserModel } from '@entities/user.model';
import { RegisterNewUser } from '@entities/register-new-user.model';
import { CustomerFactory } from '@factories/customer.factory';
import { UserTypeEnum } from '@enums/user-type.enum';
import { Password } from '../../config/utils/password';
import { AuthRequest, ChangePassword } from '../interfaces/auth-data.interface';
import { JWTHelper } from '../../config/utils/jwt-helper';

import { VALUE_NOT_FOUND } from '../constants/entity.constants';
import { SCOPE_SEPARATOR } from '../constants/configuration.constants';
import { UserGroupFactory } from '../factories/user-group.factory';

export class AuthService {
  public login = async (authRequest: AuthRequest) => {
    try {
      const userApp = await this.validateUser(
        authRequest.userName,
        authRequest.password,
      );

      const { scopes = [] } = await UserGroupFactory.createInstance().findOne(userApp.userGroupId);
      // TODO: Validar se precisa de mais dados.
      return JWTHelper.encode({
        id: userApp.id,
        name: userApp.name,
        userName: userApp.userName,
        userType: userApp.userType,
        internal: userApp.internal,
        userGroupId: userApp.userGroupId,
        roles: scopes.map((role) => this.formatRoleResources(role.route, role.access)).join(SCOPE_SEPARATOR),
      });
    } catch (error) {
      const { response: { data: dataResponseError = undefined } = {} } = error;
      throw dataResponseError || error;
    }
  };

  public refreshToken = async () => {
    // try {
    //   // const refreshToken = await Promise();

    //   return {};
    // } catch (error) {
    //   const { response: { data: dataResponseError = undefined } = {} } = error;
    //   throw dataResponseError || error;
    // }
  };

  public changePassword = async (changePassword: ChangePassword) => {
    const userApp = await this.validateUser(
      changePassword.userName,
      changePassword.currentPassword,
    );

    await UserFactory.createInstance().updateById(
      userApp.id,
      { password: changePassword.newPassword },
    );
  };

  private validateUser = async (userName: string, password: string): Promise<UserModel> => {
    const [userApp] = await UserFactory.createInstance().findAll({
      where: {
        userName: { [Op.eq]: userName },
        password: { [Op.eq]: Password.encode(password) },
        active: { [Op.eq]: true },
      },
    });

    if (!userApp) { throw VALUE_NOT_FOUND(`'User (${userName})'`); }
    return userApp;
  };

  private formatRoleResources = (resource: string, action: string) => `${resource}:${action}`;

  public registerNewUser = async (newUser: RegisterNewUser) => {
    const {
      userName, password, lastName, ...customer
    } = newUser;
    const customerData = await CustomerFactory.createInstance().create({
      ...customer, document: '1234', bithDate: new Date(1990, 1, 16), type: 1, lastName,
    } as any);
    await UserFactory.createInstance().create({
      name: lastName,
      userName,
      password,
      interface: false,
      customerId: customerData.id,
      userGroupId: '2c013b57-6251-4f9e-bb96-c449ff3e85ed',
      userType: UserTypeEnum.PROVIDER,
    } as any);
    // TODO: Tratar erro para cada situaçào.
  };
}
