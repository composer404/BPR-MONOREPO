import { Module } from '@nestjs/common';
import { SessionsGateway } from './sessions.gateway';

@Module({
    imports: [],
    providers: [SessionsGateway],
})
export class SessionsModule {}
