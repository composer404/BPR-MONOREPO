import { IWebsocketService } from '../interfaces/websocket-service.interface';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

export interface WebsocketMessage {
    author: string;
    message: string;
}

@Injectable({
    providedIn: 'root',
})
export class WebsocketService implements IWebsocketService {
    constructor(private readonly socket: Socket) {}

    connect(): void {
        this.socket.connect();
    }

    disconnect(): void {
        this.socket.disconnect();
    }

    listenForEvent(event: string, callback: any): void {
        this.socket.on(event, callback);
    }

    sendMessage(event: string, message: string): void {
        this.socket.emit(event, message);
    }
}
