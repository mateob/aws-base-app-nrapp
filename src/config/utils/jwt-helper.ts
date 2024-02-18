import { sign, verify } from 'jsonwebtoken';

export class JWTHelper {
  static JWT_SECRET: string = '44c513920ccddaa1b802762635b3dbd8';

  private static getConfigs() {
    return {
      secret: this.JWT_SECRET,
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      refresh: Math.floor(Date.now() / 1000) + (60 * 60),
    };
  }

  static decode(token: string) {
    try {
      const { secret } = JWTHelper.getConfigs();
      return verify(token, secret);
    } catch (e) {
      return null;
    }
  }

  static encode(payload: any) {
    const { secret, exp } = JWTHelper.getConfigs();
    const token = sign({ data: payload, exp }, secret);
    return { token, exp };
  }

  static isValid(token: string) {
    const data = JWTHelper.decode(token);
    if (!data) return false;
    const now = (Date.now() / 1000);
    return data.exp > now;
  }
}
