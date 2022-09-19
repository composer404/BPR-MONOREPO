import { Module } from '@nestjs/common';
import { SessionsGateway } from './sessions.gateway';
import { UserSession } from './interfaces';
import { SubscribeMessage, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Socket } from 'dgram';

@Module({
    imports: [],
    providers: [SessionsGateway],
})
export class SessionsModule {
    private readonly gymWithUsers: Map<string, UserSession[]> = new Map<string, UserSession[]>();

    @SubscribeMessage(`startSession`)
    async startSession(
        @ConnectedSocket() socket: Socket,
        @MessageBody() input: SessionInput,
    ): Promise<string | Error> {}
}
