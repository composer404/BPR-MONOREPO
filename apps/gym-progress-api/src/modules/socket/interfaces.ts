export enum REQUEST_EVENT {
    used_training_machines = `used_training_machines`,
    count_participants = `count_participants`,
    count_used_training_machines = `count_used_training_machines`,
    connect_kiosk_to_gym = `connect_kiosk_to_gym`,
    connect_user_to_gym = `connect_user_to_gym`,
    disconnect_user_to_gym = `disconnect_user_to_gym`,
}

export enum RESPONSE_EVENT {
    used_training_machines_reply = `used_training_machines_reply`,
    count_participants_reply = `count_participants_reply`,
    count_used_training_machines_reply = `count_used_training_machines_reply`,
    trainign_machine_status_changed = `trainign_machine_status_changed`,
}
export interface UserSession {
    socket?: any;
}

export interface SessionMessageInput {
    gymId?: string;
    userId?: string;
}

export interface GymSession {
    userSessions: Map<string, UserSession>;
    usedTrainingMachines: Map<string, UsedTrainingMachine>;
}

export interface UsedTrainingMachine {
    trainingMachineId?: string;
    stringStartedTimestamp?: string;
    timeframeInMinutes?: number;
    status?: boolean;
    uniqeIdentifier?: number;
}
