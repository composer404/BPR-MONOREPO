import { Injectable, UnauthorizedException } from '@nestjs/common';

import { IAuthService } from 'src/interfaces/auth-service.interface';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly authService: IAuthService) {
        super({ usernameField: `email` });
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
