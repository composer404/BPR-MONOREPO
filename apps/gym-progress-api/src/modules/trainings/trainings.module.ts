import { ITrainingService } from 'src/interfaces/trainings-service.interface';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { TrainingsController } from './trainings.controller';
import { TrainingsService } from './trainings.service';

@Module({
    imports: [PrismaModule],
    providers: [
        {
            provide: ITrainingService,
            useClass: TrainingsService,
        },
    ],
    controllers: [TrainingsController],
    exports: [ITrainingService],
})
export class TrainingsModule {}
