import {Logger} from '@nestjs/common';
import {UserId} from '../../../domain/user-id';
import {User} from '../../../domain/user';
import {IUserRepository} from '../../../domain/i-user.repository';
import {UserNotFoundException} from '../../../domain/exceptions/user-not-found.exception';

export class SearchUserByIdApp {

    private readonly logger: Logger = new Logger(SearchUserByIdApp.name);

    constructor(
        private readonly repository: IUserRepository,
    ) {
    }

    async exec(userId: UserId, throwIfUserNotFound: boolean = true): Promise<User> {
        this.logger.log(`[${this.exec.name}] INIT :: Searching: ${userId.toString()}`);
        const user: User = await this.repository.findById(userId);
        if (throwIfUserNotFound && !user) throw new UserNotFoundException();
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return user;
    }
}