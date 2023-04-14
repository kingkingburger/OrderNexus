// core
import { LoggerService as LS } from "@nestjs/common";

// lib
import * as winston from "winston";
// import dayjs from "dayjs";
import * as dayjs from "dayjs";
import { utilities as nestWinstonModuleUtilities } from "nest-winston";
import { transports } from "winston";

const { errors, combine, timestamp, printf, prettyPrint } = winston.format;

export class LoggerService implements LS {
  private logger: winston.Logger;

  constructor(service: string) {
    this.logger = winston.createLogger({
      format: combine(timestamp(), prettyPrint()),
      transports: [
        new transports.File({
          level: "error",
          filename: `error-${dayjs().format("YYYY-MM-DD")}.log`,
          dirname: "logs",
          maxsize: 5000000,
          format: combine(
            errors({ stack: true }),
            timestamp({ format: "isoDateTime" }),
            printf((info) => {
              return `${info.message}`;
            })
          )
        }),

        new transports.Console({
          level: "debug",
          format: combine(
            timestamp({ format: "isoDateTime" }),
            nestWinstonModuleUtilities.format.nestLike(service, {
              prettyPrint: true
            })
          )
        }),

        new transports.File({
          filename: `application-${dayjs().format("YYYY-MM-DD")}.log`,
          dirname: "logs",
          maxsize: 5000000,
          format: combine(
            timestamp({ format: "isoDateTime" }),
            // printf((info) => {
            //   return `${dayjs().format("YYYY-MM-DD-HH-HH")}${info.message}`;
            // })
            prettyPrint()
          )
        })
      ]
    });
  }

  log(message: string) {
    this.logger.log({ level: "info", message });
  }
  info(message: string) {
    this.logger.info(message);
  }
  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }
  warn(message: string) {
    this.logger.warning(message);
  }
  debug(message: string) {
    this.logger.debug(message);
  }
  verbose(message: string) {
    this.logger.verbose(message);
  }
}
