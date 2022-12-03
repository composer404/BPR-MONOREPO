import { ExerciseTypesController } from './exercise-types.controller';
import { ExerciseTypesService } from './exercise-types.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [ExerciseTypesService],
    controllers: [ExerciseTypesController],
    exports: [ExerciseTypesService],
})
export class ExerciseTypesModule {}
