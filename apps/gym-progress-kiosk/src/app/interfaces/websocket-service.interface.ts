export abstract class IWebsocketService {
    abstract connect(): void;
    abstract disconnect(): void;
    abstract listenForEvent(event: string, callback: any): void;
    abstract sendMessage(event: string, message: string): void;
}
