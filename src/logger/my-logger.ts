import { LoggerService, LogLevel } from "@nestjs/common";
import { createLogger, format, Logger, transports } from 'winston';
import chalk from 'chalk';
import * as dayjs from 'dayjs';
export class MyLogger implements LoggerService {

    private logger: Logger
    constructor() {
        this.logger = createLogger({
            level: 'debug',
            // format: format.combine(
            //     format.prettyPrint(),
            //     format.timestamp(),
            //     format.simple()
            // ),

            transports: [
                new transports.Console({
                    format: format.combine(
                        format.colorize(),
                        format.printf(({ context, message, level, timestamp }) => {
                            const strApp = chalk.green(`[Nest]`);
                            const strContext = chalk.yellow(`[${context}]`);
                            const strMessage = chalk.white(`${message}`);
                            return `${strApp} - ${timestamp} ${strContext} ${level} ${strMessage}`;
                        })
                    )
                }),
                new transports.File({
                    filename: 'error.log',
                    level: 'error',
                    format: format.combine(
                        format.timestamp(),
                        format.json()
                    ),
                    dirname: 'logs',

                })
            ]
        })
    }

    log(message: string, context?: string) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.logger.info(`****INFO***`, message, {context, time});
    }
    error(message: string, context?: string) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.logger.error(`****ERROR***`, message, {context, time});
    }
    warn(message: string, context?: string) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.logger.log(`****WARN***`, message, {context, time});
    }
    debug(message: string, context?: string) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.logger.log(`****DEBUG***`, message, {context, time});
    }
    verbose(message: string, context?: string) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.logger.log(`****VERBOSE***`, message, {context, time});
    }
    fatal(message: string, context?: string) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.logger.log(`****FATAL***`, message, {context, time});
    }
    setLogLevels(levels: LogLevel[]) {
        this.logger.log(`****LOG LEVELS***`, levels);
    }
}