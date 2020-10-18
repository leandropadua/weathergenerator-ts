import winston, { format } from 'winston';

export const logger = winston.createLogger({
  format: format.combine(format.colorize(), format.simple()),
  level: 'info',
  transports: [new winston.transports.Console()],
});
