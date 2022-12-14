/* eslint-disable @typescript-eslint/naming-convention */
export enum LOCAL_API_SERVICES {
    /* ---------------------------------- AUTH ---------------------------------- */

    authLogin = `/auth/login`,
    authProfile = `/auth/profile`,
    authSignup = `/auth/signup`,

    /* ---------------------------------- USERS --------------------------------- */

    users = `/users`,
    usersPassword = `/users/password`,

    /* -------------------------------- TRAININGS ------------------------------- */

    trainings = `/trainings`,

    /* ---------------------------------- GYMS ---------------------------------- */

    gyms = `/gyms`,

    /* ---------------------------------- EXERCISES --------------------------------- */
    exercises = `/exercises`,

    /* ---------------------------------- EXERCISES --------------------------------- */

    trainingMachines = `/training-machines`,

    /* -------------------------------- SESSIONS -------------------------------- */

    sessions = `/sessions`,

    /* -------------------------------- SESSIONS -------------------------------- */
    calories = `/burnedcalorie`,

    /* -------------------------------- TRAINING TYPES ------------------------------- */

    trainingTypes = `/exercise-types`,

    /* ---------------------------- TRAINING SESSIONS --------------------------- */

    trainingSessions = `/training-sessions`,
}
