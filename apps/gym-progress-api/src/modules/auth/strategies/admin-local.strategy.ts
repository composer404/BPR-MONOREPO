import { Injectable, UnauthorizedException } from '@nestjs/common';

import { IAuthService } from 'src/interfaces/auth-service.interface';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(Strategy, `admin`) {
    constructor(private readonly authService: IAuthService) {
        super({ usernameField: `login` });
    }

    async validate(login: string, password: string): Promise<any> {
        const user = await this.authService.validateAdmin(login, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
