import { ILoggerService } from 'src/interfaces/logger-service.interface';
import { LoggerService } from './logger.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    providers: [
        {
            provide: ILoggerService,
            useClass: LoggerService,
        },
    ],
    exports: [ILoggerService],
})
export class LoggerModule {}
