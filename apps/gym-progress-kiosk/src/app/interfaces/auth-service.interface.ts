import { AdminProfile, AdminSignupInput, BPRApiCreatedObject } from './interfaces';

export abstract class IAuthService {
    abstract getTokenValue(): string;

    abstract login(login: string, password: string): Promise<string>;
    abstract getProfile(): Promise<AdminProfile>;
    abstract validateUser(): Promise<boolean>;
    abstract signup(body: AdminSignupInput): Promise<BPRApiCreatedObject>;
    abstract isProfileOwner(id: string): Promise<boolean>;
    abstract logout(): void;
}
