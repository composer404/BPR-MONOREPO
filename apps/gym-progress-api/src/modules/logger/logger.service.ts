import { Injectable, Logger } from '@nestjs/common';

import { ILoggerService } from 'src/interfaces/logger-service.interface';

@Injectable()
export class LoggerService implements ILoggerService {
    private readonly logger = new Logger(LoggerService.name);

    error(message: string): void {
        this.logger.error(message);
    }

    log(message: string): void {
        this.logger.log(message);
    }
}
