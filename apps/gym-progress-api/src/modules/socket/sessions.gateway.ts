import { UserSession } from './interfaces';
import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
    namespace: `session`,
})
export class SessionsGateway {
    private readonly gymWithUsers: Map<string, UserSession[]> = new Map<string, UserSession[]>();

    // @SubscribeMessage(`startSession`)
    // async startSession(
    //     @ConnectedSocket() socket: Socket,
    //     @MessageBody() input: SessionInput,
    // ): Promise<string | Error> {}
}
