import winston, { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from './environment';
import path from 'path';

const logDirectory = `${config.root}/logs`;
const options = {
  infoFile: {
    level: 'info',
    filename: path.resolve(logDirectory, 'info-%DATE%.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    timestamp: true,
  },
  errorFile: {
    level: 'error',
    filename: path.resolve(logDirectory, 'error-%DATE%.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    timestamp: true,
  },
  console: {
    format: format.combine(
      format.timestamp(),
      format.colorize(),
      format.simple()
    ),
    level: 'debug',
    handleExceptions: true,
    json: true,
  },
};

const logger = winston.createLogger({
  transports: [
    new DailyRotateFile(options.infoFile),
    new DailyRotateFile(options.errorFile),
    new winston.transports.Console(options.console),
  ],
  // Do not exit on handled exceptions.
  exitOnError: false,
});

logger.stream = {
  write: message => {
    logger.info(message);
  },
};

module.exports = logger;