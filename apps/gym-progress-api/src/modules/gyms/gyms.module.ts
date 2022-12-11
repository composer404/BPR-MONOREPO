import { GymsController } from './gyms.controller';
import { GymsService } from './gyms.service';
import { IGymsService } from 'src/interfaces/gyms-service.interfaces';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [
        {
            provide: IGymsService,
            useClass: GymsService,
        },
    ],
    controllers: [GymsController],
    exports: [IGymsService],
})
export class GymsModule {}
