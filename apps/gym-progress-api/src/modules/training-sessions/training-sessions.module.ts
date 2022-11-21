import { ExercisesModule } from '../exercises';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TrainingSessionsController } from './training-sessions.controller';
import { TrainingSessionsService } from './training-sessions.service';
import { TrainingsModule } from '../trainings';

@Module({
    imports: [PrismaModule, ExercisesModule, TrainingsModule],
    providers: [TrainingSessionsService],
    controllers: [TrainingSessionsController],
    exports: [TrainingSessionsService],
})
export class TrainingSessionsModule {}
