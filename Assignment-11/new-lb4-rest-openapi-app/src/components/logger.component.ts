import {Component} from '@loopback/core';
import * as winston from 'winston';

export class LoggerComponent implements Component {
  log: winston.Logger;

  constructor() {
    this.log = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({timestamp, level, message}) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'combined.log'}),
      ],
    });
  }

  logInfo(message: string) {
    this.log.info(message);
  }

  logError(message: string) {
    this.log.error(message);
  }
}
