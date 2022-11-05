import { LoggerModule } from '../logger/logger.module';
import { Module } from '@nestjs/common';
import { SessionsGateway } from './sessions.gateway';

@Module({
    imports: [LoggerModule],
    providers: [SessionsGateway],
    exports: [SessionsGateway],
})
export class SessionsModule {}
