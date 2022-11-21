import { AuthModule } from './modules/auth';
import { ExercisesModule } from './modules/exercises';
import { GymsModule } from './modules/gyms/gyms.module';
import { LoggerModule } from './modules/logger/logger.module';
import { Module } from '@nestjs/common';
import { SessionsModule } from './modules/socket/sessions.module';
import { TrainingMachinesModule } from './modules/training-machines';
import { TrainingSessionsModule } from './modules/training-sessions';
import { TrainingTypesModule } from './modules/training-types';
import { TrainingsModule } from './modules/trainings';
import { UsersModule } from './modules/users';
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
        TrainingTypesModule,
        TrainingSessionsModule,
    ],
})
export class AppModule {}
