import { ExercisesModule } from '../exercises';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SessionsModule } from '../socket/sessions.module';
import { TrainingMachinesController } from './training-machines.controller';
import { TrainingMachinesService } from './training-machines.service';

@Module({
    imports: [PrismaModule, SessionsModule, ExercisesModule],
    providers: [TrainingMachinesService],
    controllers: [TrainingMachinesController],
    exports: [TrainingMachinesService],
})
export class TrainingMachinesModule {}
