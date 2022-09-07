import { Controller, UseGuards, Request, Delete, Body, Get, Put, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PasswordInput, BPRRequest, BPRUser, UserUpdateInput } from '../../models';
import { JwtAuthGuard } from '../auth/guards';
import { UsersService } from './users.service';

@ApiTags(`USER ACTIONS`)
@Controller(`users`)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(@Request() req: BPRRequest): Promise<BPRUser | null> {
        return this.usersService.findUserById(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUserById(@Param() params: any): Promise<BPRUser | null> {
        return this.usersService.findUserById(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateUser(@Request() req: BPRRequest, @Body() user: UserUpdateInput): Promise<boolean> {
        return this.usersService.updateUser(req.user.id, user);
    }

    @UseGuards(JwtAuthGuard)
    @Put(`/password`)
    async updateUserPassword(@Request() req: BPRRequest, @Body() user: PasswordInput): Promise<boolean> {
        return this.usersService.updatePassword(req.user.id, user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteUser(@Request() req: BPRRequest): Promise<boolean> {
        return this.usersService.deleteUser(req.user.id);
    }
}
