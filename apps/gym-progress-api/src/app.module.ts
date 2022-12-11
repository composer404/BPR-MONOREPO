import { AuthModule } from './modules/auth';
import { ExerciseTypesModule } from './modules/exercise-types';
import { ExercisesModule } from './modules/exercises';
import { TrainingMachinesModule } from './modules/training-machines';
import { TrainingSessionsModule } from './modules/training-sessions';
import { TrainingsModule } from './modules/trainings';
import { UsersModule } from './modules/users';

import { GymsModule } from './modules/gyms/gyms.module';
import { LoggerModule } from './modules/logger/logger.module';
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
    providers: [],
})
export class AppModule {}
