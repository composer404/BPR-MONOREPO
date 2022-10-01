import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';

@Module({
    imports: [PrismaModule],
    providers: [ExercisesService],
    controllers: [ExercisesController],
    exports: [ExercisesService],
})
export class ExercisesModule {}
