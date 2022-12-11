import { BPRUser } from './interfaces';
import { Observable } from 'rxjs';

export abstract class IUserService {
    abstract getUserById(userId: string): Observable<BPRUser>;
    abstract updateUser(body: Partial<BPRUser>): Observable<boolean>;
    abstract deleteAccount();
}
