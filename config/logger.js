const winston = require('winston');
require('winston-daily-rotate-file');

const winstonTransport = new winston.transports.DailyRotateFile({
  filename: 'cj-community-%DATE%.log',
  dirname: 'logs',
  datePattern: 'YYYY-MM-DD',
  maxSize: '5m',
  maxFiles: '5d'
});
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({
      stack: true
    }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [winstonTransport]
});

module.exports = logger;