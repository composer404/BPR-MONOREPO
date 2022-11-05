import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
    private readonly logger = new Logger(LoggerService.name);

    error(message: string): void {
        this.logger.error(message);
    }

    log(message: string): void {
        this.logger.log(message);
    }
}
