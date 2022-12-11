import { ITrainingMachineService } from 'src/interfaces/training-machines-service.interface';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SessionsModule } from '../socket/sessions.module';
import { TrainingMachinesController } from './training-machines.controller';
import { TrainingMachinesService } from './training-machines.service';
import { TrainingSessionsModule } from '../training-sessions';

@Module({
    imports: [PrismaModule, SessionsModule, TrainingSessionsModule],
    providers: [
        TrainingMachinesService,
        {
            provide: ITrainingMachineService,
            useExisting: TrainingMachinesService,
        },
    ],
    controllers: [TrainingMachinesController],
    exports: [ITrainingMachineService],
})
export class TrainingMachinesModule {}
