import {RegisterUserCommandHandler} from '../../../contexts/user/application/register/register-user.command-handler';

const CommandHandlers = [
    RegisterUserCommandHandler
];
export const UserCqrsConfig = [
    ...CommandHandlers,
];