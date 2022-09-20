import { UserSession } from './interfaces';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SessionsGateway {
    @WebSocketServer()
    server: Server;

    private readonly gymWithUsers: Map<string, UserSession[]> = new Map<string, UserSession[]>();

    @SubscribeMessage('sendMessage')
    listenForMessage(@MessageBody() data: string) {
        console.log(`received message`, data);
        this.server.sockets.emit('receiveMessage', data);
    }
}
