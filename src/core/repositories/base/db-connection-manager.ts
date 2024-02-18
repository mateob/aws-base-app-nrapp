import { Sequelize } from 'sequelize';
import * as pg from 'pg';
import { Environment } from '../../config/environment';
import logger from '../../../config/utils/logger';

export class DBConnectionManager {
  sequelize: Sequelize;

  // eslint-disable-next-line no-use-before-define
  private static db: DBConnectionManager;

  static getInstance(): DBConnectionManager {
    if (!DBConnectionManager.db) {
      DBConnectionManager.db = new DBConnectionManager();
    }
    return DBConnectionManager.db;
  }

  private constructor() {
    const { databaseConnectionString } = Environment.getSettings();

    if (!databaseConnectionString) {
      const message = 'Invalid databaseConnectionString in environment variables';
      logger.info(message);

      throw new Error(message);
    }

    this.sequelize = new Sequelize(databaseConnectionString, {
      logging: (sql: string) => logger.info(sql),
      // logging: false,
      dialectModule: pg,
    });
  }
}
