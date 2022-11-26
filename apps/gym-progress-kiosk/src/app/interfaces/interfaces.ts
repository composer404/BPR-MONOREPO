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

export interface SocketUser {
    userId: string;
    sessionStartTime: Date;
    socket: any;
}

export interface AdminSignupInput {
    login: string;
    password: string;
    information: string;
    gymId: string;
}

export interface TrainingMachines {
    id: string;
    name?: string;
    description?: string;
    location?: string;
    formula_for_calories?: string;
    video?: string;
    availability?: string;
    gymId?: string;
    class: string;
    qrBase64?: string;
}

export interface BPRApiCreatedObject {
    id: string;
}

export interface TrainingMachinesDetails extends TrainingMachines {
    trainingMachines: TrainingMachines[];
}

export interface Training {
    id?: string;
    title?: string;
    type?: string;
    description?: string;
    comment?: string;

    gymId?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface TrainingWithExercises {
    training: Training;
    exercises: Exercise[];
}

export interface Exercise {
    id?: string;
    title?: string;
    description?: string;
    exercise_type?: string;
    muscle_group?: string;
    trainingId?: string;
    quantity: string;
    createdAt?: string;
    updatedAt?: string;
    estimatedTimeInMinutes?: number;
    trainingMachineId?: string;
    activity?: string;
}

export interface ExerciseType {
    id?: string;
    activityId: string;
    name: string;
}

export interface ModalCloseResult {
    type: `Close` | `Confirm`;
    data?: any;
}
export interface Gym {
    name?: string;
    id?: string;

    street?: string;
    post_code?: string;
    country?: string;
    description?: string;
    street_number?: string;

    createdAt?: string;
    updatedAt?: string;
}