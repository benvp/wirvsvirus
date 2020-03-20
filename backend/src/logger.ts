import * as config from 'config';

import { createLogger, format, transports } from 'winston';

const serverConfig = config.get('server');

export const loggerOptions = {
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'log/default.log',
      level: serverConfig.loglevel,
    }),
    new transports.File({
      filename: 'log/errors.log',
      level: 'error',
    })
  ],
  format: format.combine(
    format.timestamp(),
    format.printf(i => `${i.timestamp} | ${i.level} | ${i.message}${i.stack ? ` | ${i.stack}` : ''}`),
  ),
}

export const logger = createLogger(loggerOptions);
