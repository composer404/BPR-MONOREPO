import { ExercisesModule } from '../exercises';
import { ITrainingSessionService } from 'src/interfaces/training-sessions-service.interface';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TrainingSessionsController } from './training-sessions.controller';
import { TrainingSessionsService } from './training-sessions.service';
import { TrainingsModule } from '../trainings';

@Module({
    imports: [PrismaModule, ExercisesModule, TrainingsModule],
    providers: [
        {
            provide: ITrainingSessionService,
            useClass: TrainingSessionsService,
        },
    ],
    controllers: [TrainingSessionsController],
    exports: [ITrainingSessionService],
})
export class TrainingSessionsModule {}
