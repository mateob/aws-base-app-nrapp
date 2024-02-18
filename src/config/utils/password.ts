import { PASSWORD_SALT } from '@constants/configuration.constants';
import * as md5 from 'md5';

export class Password {
  static encode(password: string): string {
    return md5(`${password}${PASSWORD_SALT}`);
  }
}
