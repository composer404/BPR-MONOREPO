import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
    namespace: `session`,
})
export class SessionsGateway {}
