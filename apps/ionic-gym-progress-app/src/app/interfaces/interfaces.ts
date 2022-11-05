/* eslint-disable @typescript-eslint/naming-convention */

/* ---------------------------------- ENUMS --------------------------------- */

export enum API_ERROR_CODES {
    notUniqueLogin = `notUniqueLogin`,
    notUniqueEmail = `notUniqueEmail`,
}

export enum BPR_ERROR_CODES {
    unauthorized = `unauthorized`,
    internal = `internal`,
}

export enum WEBSOCKET_EVENTS {
    connect_user_to_gym = `connect_user_to_gym`,
    training_machine_change = `machine_state_changed`,
}

/* ------------------------------- INTERFACES ------------------------------- */

export interface Token {
    accessToken: string;
}

export interface UserProfile {
    id: string;
    email: string;
}

export interface SignUpInput {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    height: number;
    weight: number;
    sex: string;
    age: number;
    avatar: string;
}

export interface BPRApiCreatedObject {
    id: string;
}

export interface DialogResponse {
    data: any;
    role: string;
}

export interface ConfirmDialogInput {
    header: string;
    confirmFn?: any;
    cancelFn?: any;
    confirmText?: string;
    confirmRole?: string;
    cancelText?: string;
    cancelRole?: string;
}

export interface BPRUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date;
    sex: string;
    height: number;
    weight: number;
    age: number;
}

/* ----------------------------------- GYM ---------------------------------- */

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

/* ------------------------- TRAININGS AND EXERCISES ------------------------ */

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
    quantity: number;
    createdAt?: string;
    updatedAt?: string;
    estimatedTimeInMinutes?: number;
    trainingMachineId?: string;
}

export interface TrainingMachine {
    id?: string;
    name?: string;
    description?: string;
    location?: string;
    video?: string;
    availability?: boolean;
    formula_for_calories?: string;
    createdAt?: string;
    updatedAt?: string;
    class?: string;
    gymId: string;
    exercises?: Exercise[];
}
