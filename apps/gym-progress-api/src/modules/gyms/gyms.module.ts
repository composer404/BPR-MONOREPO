import { GymsController } from './gyms.controller';
import { GymsService } from './gyms.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [GymsService],
    controllers: [GymsController],
    exports: [GymsService],
})
export class GymsModule {}
