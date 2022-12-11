import { CreatedObjectResponse, PasswordInput, PrismaErrorResponse, SignUpInput, UserUpdateInput } from 'src/models';

import { User } from '@prisma/client';

export abstract class IUserService {
    abstract findUserById(id: string): Promise<User | null>;
    abstract findUserByEmail(email: string, withPassword?: boolean): Promise<User | null>;
    abstract createUser(input: SignUpInput): Promise<CreatedObjectResponse | PrismaErrorResponse | null>;
    abstract updatePassword(userId: string, input: PasswordInput): Promise<boolean>;
    abstract updateUser(userId: string, input: UserUpdateInput): Promise<boolean>;
    abstract deleteUser(userId: string): Promise<boolean>;
}
