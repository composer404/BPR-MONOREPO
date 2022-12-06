import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { TokenInterceptorService } from './helpers/http-interceptor';
import { WebsocketService } from './services/api/websocket.service';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = {
    url: environment.localApiUrl,
    options: {
        extraHeaders: {
            'ngrok-skip-browser-warning': 'any',
        },
    },
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SocketIoModule.forRoot(config),
    ],
    providers: [
        MessageService,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private readonly webSocketService: WebsocketService) {
        this.webSocketService.connect();
    }
}
