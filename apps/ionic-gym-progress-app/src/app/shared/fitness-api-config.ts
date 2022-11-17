import { environment } from 'src/environments/environment';

const API_URL = `https://fitness-calculator.p.rapidapi.com`;

export enum API_RESOURCES {
    BURNEDCALORIES = `/burnedcalorie`
}


export const buildUrl = (resource: API_RESOURCES) => {
    return `${API_URL}${resource}?api_key=${environment.API_KEY}`;
};

