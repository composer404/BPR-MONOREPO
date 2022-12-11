import { WEBSOCKET_REQUEST_EVENT, WEBSOCKET_RESPONSE_EVENT } from './interfaces';

export abstract class IWebsocketService {
    abstract connect(): void;
    abstract disconnect(): void;
    abstract listenForEvent(event: WEBSOCKET_RESPONSE_EVENT, callback: any): void;
    abstract sendMessage(event: WEBSOCKET_REQUEST_EVENT, message: string): void;
    abstract removeListener(listener: any);
}
