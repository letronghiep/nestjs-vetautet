import { ConsoleLogger } from "@nestjs/common";

export class MyLoggerDev extends ConsoleLogger {
    log(message: string, context?: string) {
        console.log(`****INFO***[${context}]*  |`,  message);
    }
    error(message: string, context?: string) {
        console.error(`****ERROR***[${context}]*  |`,  message);
    }
    warn(message: string, context?: string) {
        console.warn(`****WARN***[${context}]*  |`,  message);
    }
    
}