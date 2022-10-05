import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { TokenInterceptorService } from './helpers/http-interceptor';
import { WebsocketService } from './services/websocket.service';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = { url: environment.localApiUrl, options: {} };
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule,  BrowserAnimationsModule, AppRoutingModule, HttpClientModule, SocketIoModule.forRoot(config)],
    providers: [
        MessageService,
        WebsocketService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private readonly websocketService: WebsocketService) {
        this.websocketService.connect();
    }
}
