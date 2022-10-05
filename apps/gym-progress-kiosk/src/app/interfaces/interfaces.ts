/* eslint-disable @typescript-eslint/naming-convention */
export interface Token {
    accessToken: string;
}

export enum API_ERROR_CODES {
    notUniqueLogin = `notUniqueLogin`,
    notUniqueEmail = `notUniqueEmail`,
}

export enum BPR_ERROR_CODES {
    unauthorized = `unauthorized`,
    internal = `internal`,
}

export interface BPRApiCreatedObject {
    id: string;
}

export enum BPR_ADMIN_ACTIONS {
    confirm = `confirm`,
    cancel = `cancel`,
}

export interface AdminProfile {
    id: string;
    login: string;
}

export interface AdminSignupInput {
    login: string;
    password: string;
    information: string;
    gymId: string;
}

export interface TrainingMachines {
    id:string;
    name: string;
    description: string;
    location: string;
    formulaForCalories: string;
    video: string;
    availability: string;
    gymId: string;
}

export interface TrainingMachinesDetails extends TrainingMachines {
    trainingMachines: TrainingMachines[];
}

