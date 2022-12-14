import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminJwtGuard extends AuthGuard('jwt-admin') {}
