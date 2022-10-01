import { AuthModule } from './modules/auth';
import { GymsModule } from './modules/gyms/gyms.module';
import { Module } from '@nestjs/common';
import { SessionsModule } from './modules/socket/sessions.module';
import { TrainingMachinesModule } from './modules/training-machines';
import { TrainingsModule } from './modules/trainings/trainings.module';
import { UsersModule } from './modules/users';

@Module({
    imports: [AuthModule, UsersModule, TrainingMachinesModule, GymsModule, SessionsModule, TrainingsModule],
})
export class AppModule {}
