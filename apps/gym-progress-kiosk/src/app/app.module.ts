import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthService } from './services/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ElectronService } from './services/electron.service';
import { ExerciseService } from './services/exercise.service';
import { IAuthService } from './interfaces/auth-service.interface';
import { IElectronService } from './interfaces/electron-service.interface';
import { IExerciseService } from './interfaces/exercise-service.interface';
import { IInfoService } from './interfaces/info-service.interface';
import { ITrainingMachinesService } from './interfaces/training-machine-service.interface';
import { ITrainingService } from './interfaces/training-service.interface';
import { IWebsocketService } from './interfaces/websocket-service.interface';
import { InfoService } from './services/info.service';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { TokenInterceptorService } from './helpers/http-interceptor';
import { TrainingMachinesService } from './services/training-machines.service';
import { TrainingService } from './services/training.service';
import { WebsocketService } from './services/websocket.service';
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
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ToastModule,
        SocketIoModule.forRoot(config),
    ],
    providers: [
        DynamicDialogRef,
        DynamicDialogConfig,
        DialogService,
        MessageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        },
        { provide: IAuthService, useClass: AuthService },
        { provide: IElectronService, useClass: ElectronService },
        { provide: IExerciseService, useClass: ExerciseService },
        { provide: IInfoService, useClass: InfoService },
        { provide: ITrainingMachinesService, useClass: TrainingMachinesService },
        { provide: ITrainingService, useClass: TrainingService },
        { provide: IWebsocketService, useClass: WebsocketService },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private readonly websocketService: WebsocketService) {
        this.websocketService.connect();
        this.websocketService.sendMessage(
            `connect_kiosk_to_gym`,
            JSON.stringify({
                //! MOCK FOR NOW
                id: `3dffeab7-b803-44c2-9829-40aa3770aef3`,
            }),
        );
    }
}
