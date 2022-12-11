import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ExerciseService } from './services/api/exercise.service';
import { GymService } from './services/api/gym.service';
import { IAuthService } from './interfaces/auth-service.interface';
import { IExerciseService } from './interfaces/exercise-service.interface';
import { IGymService } from './interfaces/gym-service.interface';
import { IScannerService } from './interfaces/scanner.interface';
import { ISessionsService } from './interfaces/sessions-service.interface';
import { IStatService } from './interfaces/stat-service.interface';
import { ITrainingMachineService } from './interfaces/training-machine-service.interface';
import { ITrainingSessionService } from './interfaces/training-session-service.interface';
import { ITrainingsService } from './interfaces/trainings-service.interface';
import { IUserService } from './interfaces/user-service.interface';
import { IWebsocketService } from './interfaces/websocket-service.interface';
import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { ScannerService } from './services/common/scanner.service';
import { SessionsService } from './services/api/sessions.service';
import { StatsService } from './services/common/stats.service';
import { TokenInterceptorService } from './helpers/http-interceptor';
import { TrainingMachineService } from './services/api/training-machine.service';
import { TrainingService } from './services/api/trainings.service';
import { TrainingSessionService } from './services/api/training-session.service';
import { UserService } from './services/api/user.service';
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
        { provide: ITrainingSessionService, useClass: TrainingSessionService },
        { provide: IExerciseService, useClass: ExerciseService },
        { provide: IGymService, useClass: GymService },
        { provide: ISessionsService, useClass: SessionsService },
        { provide: ITrainingMachineService, useClass: TrainingMachineService },
        { provide: ITrainingsService, useClass: TrainingService },
        { provide: IUserService, useClass: UserService },
        { provide: IWebsocketService, useClass: WebsocketService },
        { provide: IStatService, useClass: StatsService },
        { provide: IScannerService, useClass: ScannerService },
        { provide: IAuthService, useClass: AuthService },
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
