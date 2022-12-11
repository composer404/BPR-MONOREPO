import { ExerciseTypesController } from './exercise-types.controller';
import { ExerciseTypesService } from './exercise-types.service';
import { IExerciseTypesService } from 'src/interfaces/exercise-types.interface';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [
        {
            provide: IExerciseTypesService,
            useClass: ExerciseTypesService,
        },
    ],
    controllers: [ExerciseTypesController],
    exports: [IExerciseTypesService],
})
export class ExerciseTypesModule {}
