import { LoggerModule } from '../logger/logger.module';
import { Module } from '@nestjs/common';
import { SessionsController } from './session.controller';
import { SessionsGateway } from './sessions.gateway';

@Module({
    imports: [LoggerModule],
    providers: [SessionsGateway],
    controllers: [SessionsController],
    exports: [SessionsGateway],
})
export class SessionsModule {}
