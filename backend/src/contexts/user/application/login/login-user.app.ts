import {Logger} from '@nestjs/common';
import {IUserRepository} from '../../domain/i-user.repository';
import {UserDto} from '../../domain/user.dto';
import {User} from '../../domain/user';

export class LoginUserApp {

    private readonly logger: Logger = new Logger(LoginUserApp.name);

    constructor(private readonly repository: IUserRepository) {
    }

    public async exec(username: string, password: string): Promise<UserDto> {
        this.logger.log(`[${this.exec.name}] INIT :: username: ${username}`);
        const user: User = await this.repository.findByUsername(username);
        if (!user || !user.password.compare(password)) return undefined;
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return user.toPrimitives();
    }
}