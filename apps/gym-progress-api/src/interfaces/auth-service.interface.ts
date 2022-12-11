import { Administrator, User } from '@prisma/client';
import { CreatedObjectResponse, PrismaErrorResponse, SignUpInput } from 'src/models';

export abstract class IAuthService {
    abstract validateAdmin(login: string, password: string): Promise<Administrator | null>;
    abstract validateUser(email: string, password: string): Promise<User | null>;
    abstract login(user: any): Promise<any>;
    abstract loginAdmin(admin: any): Promise<any>;
    abstract registry(userInput: SignUpInput): Promise<CreatedObjectResponse | PrismaErrorResponse | null>;
}
