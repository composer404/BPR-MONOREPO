import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, `admin`) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.AUTH_JWT_SECRET,
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, login: payload.login };
    }
}
