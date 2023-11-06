import {RegisterUserCommandHandler} from '../../../contexts/user/application/register/register-user.command-handler';
import {LoginUserCommandHandler} from '../../../contexts/user/application/login/login-user.command-handler';
import {
    BuildAccessInfoCommandHandler
} from '../../../contexts/user/application/build/build-access-info.command-handler';

const CommandHandlers = [
    BuildAccessInfoCommandHandler,
    LoginUserCommandHandler,
    RegisterUserCommandHandler,
];
export const UserCqrsConfig = [
    ...CommandHandlers,
];