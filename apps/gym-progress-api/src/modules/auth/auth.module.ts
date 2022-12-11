import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
import { AdminLocalStrategy } from './strategies/admin-local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GymsModule } from '../gyms/gyms.module';
import { IAuthService } from 'src/interfaces/auth-service.interface';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users';

@Module({
    imports: [
        UsersModule,
        GymsModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.AUTH_JWT_SECRET,
        }),
    ],
    providers: [
        AdminJwtStrategy,
        AdminLocalStrategy,
        JwtStrategy,
        LocalStrategy,
        {
            provide: IAuthService,
            useClass: AuthService,
        },
    ],
    controllers: [AuthController],
    exports: [IAuthService],
})
export class AuthModule {}
