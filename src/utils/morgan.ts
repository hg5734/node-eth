import * as morgan from 'morgan';
import * as winston from 'winston';

require('winston-daily-rotate-file');

const logDirectory = process.cwd();

const fileTransport = new (winston.transports['DailyRotateFile'])({
  filename: `${logDirectory}/logs/morgan/access-%DATE%.log`,
  datePattern: 'DD-MM-YYYY',
  zippedArchive: true,
  maxSize: '50m',
  maxFiles: '14d',
  handleExceptions: true
});

const logger = winston.createLogger({
  level: 'info',
  transports: [
    fileTransport
  ],
  exitOnError: false
});

const stream = {
  write: (message: any) => {
    logger.info(message);
  }
};

export default morgan('[date[web] [:remote-addr :remote-user]'
+ ' ["HTTP/:http-version :method :url"] [:referrer] [:user-agent] [:req[header]]'
+ ' [:res[content-length]] [:res[header]] [:status] [:response-time ms]', { stream });
