import { ISocketService } from 'src/interfaces/socket-service.interface';
import { LoggerModule } from '../logger/logger.module';
import { Module } from '@nestjs/common';
import { SessionsController } from './session.controller';
import { SessionsGateway } from './sessions.gateway';

@Module({
    imports: [LoggerModule],
    providers: [
        {
            provide: ISocketService,
            useClass: SessionsGateway,
        },
    ],
    controllers: [SessionsController],
    exports: [ISocketService],
})
export class SessionsModule {}
