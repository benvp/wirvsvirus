import * as config from 'config';

import { Logger } from '@nestjs/common';

const entityDir = __dirname + '/../**/*.entity.{js,ts}';
const migrationDir = __dirname + '/../migration/*.ts';
const dbConfig = config.get('db');

const dbUser = process.env.DB_USERNAME || dbConfig.username;
const dbPassword = process.env.DB_PASSWORD || dbConfig.password;

if (process.env.NODE_ENV === 'production') {
  if (!dbUser || !dbPassword) {
    Logger.error('No database username or password defined. In production mode you should provide the environment variables DB_USERNAME and DB_PASSWORD!')
    process.exit(1);
  }
}

export = {
  type: process.env.DB_TYPE || dbConfig.type,
  host: process.env.DB_HOSTNAME || dbConfig.host,
  port: process.env.DB_PORT || dbConfig.port,
  username: dbUser,
  password: dbPassword,
  database: process.env.DB_NAME || dbConfig.database,
  entities: [entityDir],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
  migrations: [migrationDir],
  cli: {
    migrationsDir: 'src/migration',
  },
};
