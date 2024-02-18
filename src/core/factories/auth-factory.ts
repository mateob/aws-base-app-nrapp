import { AuthService } from '@services/auth.service';

export class AuthFactory {
  static createInstance() {
    return new AuthService();
  }
}
