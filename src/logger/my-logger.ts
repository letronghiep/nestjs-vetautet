import { LoggerService, LogLevel } from "@nestjs/common";

export class MyLogger implements LoggerService {
    log(message: string, context?: string) {
        console.log(`****INFO***[${context}]*  |`,  message);
    }
    error(message: string, context?: string) {
        console.error(`****ERROR***[${context}]*  |`,  message);
    }
    warn(message: string, context?: string) {
        console.warn(`****WARN***[${context}]*  |`,  message);
    }
    debug(message: string, context?: string) {
        console.debug(`****DEBUG***[${context}]*  |`,  message);
    }
    verbose(message: string, context?: string) {
        console.log(`****VERBOSE***[${context}]*  |`,  message);
    }
    fatal(message: string, context?: string) {
        console.log(`****FATAL***[${context}]*  |`,  message);
    }
    setLogLevels(levels: LogLevel[]) {
        console.log(`****LOG LEVELS***[${levels}]*  |`);
    }
}