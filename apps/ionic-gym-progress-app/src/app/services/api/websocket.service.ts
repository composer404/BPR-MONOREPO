import { WEBSOCKET_REQUEST_EVENT, WEBSOCKET_RESPONSE_EVENT } from 'src/app/interfaces/interfaces';

import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

export interface WebsocketMessage {
    author: string;
    message: string;
}

@Injectable({
    providedIn: 'root',
})
export class WebsocketService {
    constructor(private readonly socket: Socket) {
        this.socket.ioSocket.headers = {
            'ngrok-skip-browser-warning': 'any',
        };
    }

    connect(): void {
        this.socket.connect();
    }

    disconnect(): void {
        this.socket.disconnect();
    }

    listenForEvent(event: WEBSOCKET_RESPONSE_EVENT, callback: any): void {
        this.socket.on(event, callback);
    }

    sendMessage(event: WEBSOCKET_REQUEST_EVENT, message: string): void {
        this.socket.emit(event, message);
    }

    removeListener(listener: any) {
        this.socket.removeListener(listener);
    }
}
