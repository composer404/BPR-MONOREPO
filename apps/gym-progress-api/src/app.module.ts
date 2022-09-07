import { AuthModule } from './modules/auth';
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users';

@Module({
    imports: [AuthModule, UsersModule],
})
export class AppModule {}
