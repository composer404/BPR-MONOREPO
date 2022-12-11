import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { IExerciseService } from 'src/interfaces/exercises-service.interface';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';

@Module({
    imports: [PrismaModule],
    providers: [
        {
            provide: IExerciseService,
            useClass: ExercisesService,
        },
    ],
    controllers: [ExercisesController],
    exports: [IExerciseService],
})
export class ExercisesModule {}
