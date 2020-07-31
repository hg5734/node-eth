import * as winston from 'winston';
import { vars } from '../config/vars';

const { serviceName } = vars;

require('winston-daily-rotate-file');

const logDirectory = process.cwd();
const transports = [];

/*
 * Simple helper for stringifying all remaining
 * properties.
 */
function rest(info : object) : string {
  delete info['level'];
  delete info['message'];
  delete info['splat'];
  delete info['label'];
  delete info['timestamp'];
  delete info['service'];

  if (!Object.keys(info).length) {
    return '';
  }

  return JSON.stringify(info);
}


const fileTransport = new (winston.transports['DailyRotateFile'])({
  filename: `${logDirectory}/logs/winston/${serviceName}-%DATE%.log`,
  datePattern: 'DD-MM-YYYY',
  zippedArchive: true,
  maxSize: '50m',
  maxFiles: '14d',
  handleExceptions: true
});

transports.push(fileTransport);

const errorTransport = new (winston.transports['DailyRotateFile'])({
  filename: `${logDirectory}/logs/errors-${serviceName}-%DATE%.log`,
  datePattern: 'DD-MM-YYYY',
  zippedArchive: true,
  maxSize: '50m',
  maxFiles: '14d',
  level: 'error',
  handleExceptions: true
});

transports.push(errorTransport);

if (process.env.NODE_ENV !== 'production') {
  const consoleLog = new winston.transports.Console({
    level: 'debug',
    handleExceptions: false
  });
  transports.push(consoleLog);
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss'
    }),
    winston.format.splat(),
    winston.format.printf((info) => `[${info.timestamp}] [${info.level}] : ${info.message} ${rest(info)}`)
  ),
  defaultMeta: { service: `${serviceName}` },
  transports,
  exitOnError: false
});

export default logger;
