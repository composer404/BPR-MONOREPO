import { LoggerService } from './logger.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    providers: [LoggerService],
    exports: [LoggerService],
})
export class LoggerModule {}
