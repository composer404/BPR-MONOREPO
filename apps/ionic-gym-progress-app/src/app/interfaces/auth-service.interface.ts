import { BPRApiCreatedObject, SignUpInput, UserProfile } from './interfaces';

export abstract class IAuthService {
    abstract getTokenValue(): string;
    abstract login(email: string, password: string): Promise<string>;
    abstract getProfile(): Promise<UserProfile>;
    abstract validateUser(): Promise<boolean>;
    abstract signup(body: SignUpInput): Promise<BPRApiCreatedObject>;
    abstract isProfileOwner(id: string): Promise<boolean>;
    abstract logout(): void;
}
