import { Gym } from './interfaces';

export abstract class IGymService {
    abstract getGymsByName(name: string): Promise<Gym[] | null>;
    abstract getGymById(id: string): Promise<Gym | null>;
}
