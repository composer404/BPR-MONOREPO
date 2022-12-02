import {Gym} from './interfaces';

export interface IGymService {
  getGymsByName(name: string): Promise<Gym[] | null>;
  getGymById(id: string): Promise<Gym | null>;
}
