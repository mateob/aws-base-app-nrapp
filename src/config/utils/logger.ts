/* eslint-disable no-console */
import * as Format from 'string-format';
import { Environment } from '../../core/config/environment';

const consoleLogger = (_configs) => {
  return {
    info: (text) => {
      console.log(`[${new Date().toISOString()}] - ${text}`);
    },
    error: (err) => {
      console.error(`[${new Date().toISOString()}] - ${JSON.stringify(err)}`);
    },
    warn: (text) => {
      console.warn(`[${new Date().toISOString()}] - ${text}`);
    },
    debug: (text) => {
      console.debug(`[${new Date().toISOString()}] - ${text}`);
    },
  };
};

class Logger {
  static loggerPino = consoleLogger({
    enabled: (Environment.getSettings().loggerEnabled === 'true'),
    level: Environment.getSettings().loggerLevel,
  });

  static info(text: string, params?: any) {
    Logger.loggerPino.info(params ? Format(text, Logger.fixParams(params)) : text);
  }

  static error(text: string, params?: any) {
    Logger.loggerPino.error(params ? Format(text, Logger.fixParams(params)) : text);
  }

  static warn(text: string, params?: any) {
    Logger.loggerPino.warn(params ? Format(text, Logger.fixParams(params)) : text);
  }

  static debug(text: string, params?: any) {
    Logger.loggerPino.debug(params ? Format(text, Logger.fixParams(params)) : text);
  }

  static fixParams(params?: any) {
    if (params) {
      Object.keys(params).forEach((k) => {
        if (typeof params[k] === 'object') {
          params[k] = JSON.stringify(params[k]);
        }
      });
    }
    return params;
  }
}

const logger = Logger;
export default logger;
