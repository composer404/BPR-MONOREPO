import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TrainingTypesController } from './training-types.controller';
import { TrainingTypesService } from './training-types.service';

@Module({
    imports: [PrismaModule],
    providers: [TrainingTypesService],
    controllers: [TrainingTypesController],
    exports: [TrainingTypesService],
})
export class TrainingTypesModule {}
