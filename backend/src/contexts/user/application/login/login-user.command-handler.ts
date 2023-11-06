import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {LoginUserCommand} from './login-user.command';
import {UserDto} from '../../domain/user.dto';
import {LoginUserApp} from './login-user.app';

@CommandHandler(LoginUserCommand)
export class LoginUserCommandHandler implements ICommandHandler<LoginUserCommand, UserDto> {

    constructor(private readonly app: LoginUserApp) {
    }

    execute(command: LoginUserCommand): Promise<UserDto> {
        return this.app.exec(command.username, command.password);
    }
}