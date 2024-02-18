import { ISettings } from '@interfaces/settings.interface';
import { get as env } from 'env-var';

export class Environment {
  static getSettings(): ISettings {
    return {
      nodeEnv: env('NODE_ENV').asString(),
      loggerEnabled: env('loggerEnabled').asString(),
      loggerLevel: env('loggerLevel').asString(),
      databaseConnectionString: env('databaseConnectionString').asString(),
      awsRegion: env('awsRegion').asString(),
    };
  }
}
