import { AuthModule } from './modules/auth';
import { GymsModule } from './modules/gyms/gyms.module';
import { Module } from '@nestjs/common';
import { TrainingMachinesModule } from './modules/training-machines';
import { UsersModule } from './modules/users';

@Module({
    imports: [AuthModule, UsersModule, TrainingMachinesModule, GymsModule],
})
export class AppModule {}
