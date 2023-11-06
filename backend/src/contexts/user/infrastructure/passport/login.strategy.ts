import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-local';
import {Injectable} from '@nestjs/common';
import {CommandBus} from '@nestjs/cqrs';
import {UserUnauthorizedException} from '../../domain/exceptions/user-unauthorized.exception';
import {LoginUserCommand} from '../../application/login/login-user.command';
import {UserDto} from '../../domain/user.dto';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly commandBus: CommandBus) {
        super({usernameField: 'username'});
    }

    async validate(username: string, password: string): Promise<UserDto> {
        const user: UserDto = await this.commandBus.execute(new LoginUserCommand(username.toLowerCase(), password));
        if (!user) throw new UserUnauthorizedException();
        return user;
    }
}