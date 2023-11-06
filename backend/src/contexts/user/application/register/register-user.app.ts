import {Logger} from '@nestjs/common';
import {User} from '../../domain/user';
import {IUserRepository} from '../../domain/i-user.repository';
import {UserAlreadyExistsException} from '../../domain/exceptions/user-already-exists.exception';
import {UserPassword} from '../../domain/user-password';
import {CardTypeConstants} from '../../../card/domain/card-type.constants';
import {UserStatusConstants} from '../../domain/user-status.constants';
import {UserId} from '../../domain/user-id';
import {RegisterUserAppResponse} from './register-user.app.response';
import {UserDto} from '../../domain/user.dto';
import {IJwt} from '../../../shared/domain/i-jwt';
import {mapFromUser} from '../../domain/user.decorator';

export class RegisterUserApp {

    private readonly logger: Logger = new Logger(RegisterUserApp.name);

    constructor(
        private readonly repository: IUserRepository,
        private readonly jwt: IJwt,
    ) {
    }

    private static map(username: string, password: string): User {
        return User.fromPrimitives({
            cardType: CardTypeConstants.DEFAULT,
            password: UserPassword.hash(password),
            status: UserStatusConstants.ACTIVE,
            tokens: 100,
            userId: UserId.create().toString(),
            username: username.toLowerCase(),
        });
    }

    async exec(username: string, password: string): Promise<RegisterUserAppResponse> {
        this.logger.log(`[${this.exec.name}] INIT :: username: ${username}`);
        await this.validateIfUserAlreadyExists(username);
        UserPassword.validate(password);
        const user: User = RegisterUserApp.map(username, password);
        const created: User = await this.repository.create(user);
        const rawUser: UserDto = created.toPrimitives();
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return {user: rawUser, token: this.jwt.sign(mapFromUser(rawUser))};
    }

    private async validateIfUserAlreadyExists(username: string): Promise<void> {
        const currentUser: User = await this.repository.findByUsername(username);
        if (currentUser) throw new UserAlreadyExistsException();
    }
}