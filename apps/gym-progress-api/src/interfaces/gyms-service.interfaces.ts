import { Administrator, Gym } from '@prisma/client';
import { AdministratorInput, CreatedObjectResponse, GymInput } from 'src/models';

export abstract class IGymsService {
    abstract findGymById(id: string): Promise<Gym | null>;
    abstract findGymByName(name: string): Promise<Gym[] | null>;
    abstract createGym(input: GymInput): Promise<CreatedObjectResponse | null>;
    abstract deleteGym(id: string): Promise<boolean>;
    abstract updateGym(id: string, input: GymInput): Promise<boolean>;
    abstract addAdministratorToGym(
        gymId: string,
        administratorInput: AdministratorInput,
    ): Promise<CreatedObjectResponse | null>;
    abstract findAdministratorByLogin(login: string): Promise<Administrator | null>;
}
