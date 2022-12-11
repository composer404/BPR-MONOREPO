import { IUserService } from 'src/interfaces/users-service.interfaces';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [PrismaModule],
    providers: [
        {
            provide: IUserService,
            useClass: UsersService,
        },
    ],
    controllers: [UsersController],
    exports: [IUserService],
})
export class UsersModule {}
