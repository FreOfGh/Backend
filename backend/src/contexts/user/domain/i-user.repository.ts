import {User} from './user';

export interface IUserRepository {
    findByUsername(username: string): Promise<User>;

    create(user: User): Promise<User>;
}