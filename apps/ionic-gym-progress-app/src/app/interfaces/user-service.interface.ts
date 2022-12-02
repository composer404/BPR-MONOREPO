import {Observable} from 'rxjs';
import {BPRUser} from './interfaces';

export interface IUserService {
  getUserById(userId: string): Observable<BPRUser>;
  updateUser(body: Partial<BPRUser>): Observable<boolean>;
  deleteAccount();
}
