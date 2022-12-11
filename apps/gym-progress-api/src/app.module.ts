import { AuthModule, AuthService } from './modules/auth';
import { ExerciseTypesModule, ExerciseTypesService } from './modules/exercise-types';
import { ExercisesModule, ExercisesService } from './modules/exercises';
import { TrainingMachinesModule, TrainingMachinesService } from './modules/training-machines';
import { TrainingSessionsModule, TrainingSessionsService } from './modules/training-sessions';
import { TrainingsModule, TrainingsService } from './modules/trainings';
import { UsersModule, UsersService } from './modules/users';

import { GymsModule } from './modules/gyms/gyms.module';
import { GymsService } from './modules/gyms/gyms.service';
import { IAuthService } from './interfaces/auth-service.interface';
import { IExerciseService } from './interfaces/exercises-service.interface';
import { IExerciseTypesService } from './interfaces/exercise-types.interface';
import { IGymsService } from './interfaces/gyms-service.interfaces';
import { ILoggerService } from './interfaces/logger-service.interface';
import { ITrainingMachineService } from './interfaces/training-machines-service.interface';
import { ITrainingService } from './interfaces/trainings-service.interface';
import { ITrainingSessionService } from './interfaces/training-sessions-service.interface';
import { IUserService } from './interfaces/users-service.interfaces';
import { LoggerModule } from './modules/logger/logger.module';
import { LoggerService } from './modules/logger/logger.service';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SessionsModule } from './modules/socket/sessions.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        TrainingMachinesModule,
        GymsModule,
        SessionsModule,
        TrainingsModule,
        ExercisesModule,
        LoggerModule,
        ExerciseTypesModule,
        TrainingSessionsModule,
        ScheduleModule.forRoot(),
    ],
    providers: [
        // { provide: IAuthService, useExisting: AuthService },
        // { provide: IExerciseTypesService, useExisting: ExerciseTypesService },
        // { provide: IExerciseService, useExisting: ExercisesService },
        // { provide: IGymsService, useExisting: GymsService },
        // { provide: ILoggerService, useExisting: LoggerService },
        // { provide: ITrainingMachineService, useExisting: TrainingMachinesService },
        // { provide: ITrainingSessionService, useExisting: TrainingSessionsService },
        // { provide: ITrainingService, useExisting: TrainingsService },
        // { provide: IUserService, useExisting: UsersService },
    ],
})
export class AppModule {}
