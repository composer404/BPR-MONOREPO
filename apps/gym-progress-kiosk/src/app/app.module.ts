import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = { url: environment.localApiUrl, options: {} };
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, SocketIoModule.forRoot(config)],
    providers: [MessageService, WebsocketService],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private readonly websocketService: WebsocketService) {
        this.websocketService.connect();
    }
}
