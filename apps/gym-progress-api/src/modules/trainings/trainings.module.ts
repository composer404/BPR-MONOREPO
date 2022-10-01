import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma';
import { TrainingsController } from './trainings.controller';
import { TrainingsService } from './trainings.service';

@Module({
    imports: [PrismaModule],
    providers: [TrainingsService],
    controllers: [TrainingsController],
    exports: [TrainingsService],
})
export class TrainingsModule {}
