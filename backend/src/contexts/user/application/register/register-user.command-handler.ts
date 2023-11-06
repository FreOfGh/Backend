import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {RegisterUserCommand} from './register-user.command';
import {RegisterUserAppResponse} from './register-user.app.response';
import {RegisterUserApp} from './register-user.app';

@CommandHandler(RegisterUserCommand)
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand, RegisterUserAppResponse> {

    constructor(private readonly app: RegisterUserApp) {
    }

    public async execute(command: RegisterUserCommand): Promise<RegisterUserAppResponse> {
        return this.app.exec(command.username, command.password);
    }
}