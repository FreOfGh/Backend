import {Logger} from '@nestjs/common';
import {User} from '../../domain/user';
import {IUserRepository} from '../../domain/i-user.repository';
import {UserNotUpdatedException} from '../../domain/exceptions/user-not-updated.exception';

export class UpdateUserApp {

    private readonly logger: Logger = new Logger(UpdateUserApp.name);

    constructor(private readonly repository: IUserRepository) {
    }

    async exec(user: User, throwExceptionIfCantUpdate = true): Promise<User> {
        this.logger.log(`[${this.exec.name}] INIT :: userId: ${user.userId.toString()}`);
        const updated: User = await this.repository.update(user);
        if (throwExceptionIfCantUpdate && !updated) throw new UserNotUpdatedException();
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return updated;
    }
}