import { Controller, Post, UseGuards, Get, Body, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IAuthService } from 'src/interfaces/auth-service.interface';
import { CreatedObjectResponse, PrismaErrorResponse, BPRRequest, SignUpInput, UserOutput } from '../../models';
import { AdminAuthGuard, JwtAuthGuard, LocalAuthGuard } from './guards';
import { AdminJwtGuard } from './guards/admin-jwt.guard';

@ApiTags(`AUTH ACTIONS`)
@Controller(`auth`)
export class AuthController {
    constructor(private readonly authService: IAuthService) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req: BPRRequest): UserOutput {
        return req.user;
    }

    @UseGuards(AdminJwtGuard)
    @Get('admin/profile')
    getAdminProfile(@Request() req: BPRRequest): UserOutput {
        return req.user;
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: BPRRequest) {
        return this.authService.login(req.user);
    }

    @UseGuards(AdminAuthGuard)
    @Post('admin/login')
    async adminLogin(@Request() req: BPRRequest) {
        return this.authService.loginAdmin(req.user);
    }

    @Post('signup')
    async registry(@Body() userInput: SignUpInput): Promise<CreatedObjectResponse | PrismaErrorResponse | null> {
        return this.authService.registry(userInput);
    }
}
