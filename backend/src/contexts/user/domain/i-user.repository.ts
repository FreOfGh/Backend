import {User} from './user';
import {UserId} from './user-id';

export interface IUserRepository {
    findById(userId: UserId): Promise<User>;

    findByUsername(username: string): Promise<User>;

    create(user: User): Promise<User>;
}