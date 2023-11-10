import {RegisterUserCommandHandler} from '../../../contexts/user/application/register/register-user.command-handler';
import {LoginUserCommandHandler} from '../../../contexts/user/application/login/login-user.command-handler';
import {
    BuildAccessInfoCommandHandler
} from '../../../contexts/user/application/build/build-access-info.command-handler';
import {
    UpdateUserCardDesignCommandHandler
} from '../../../contexts/user/application/update/card-design/update-user-card-design.command-handler';
import {
    SearchUserByIdQueryHandler
} from '../../../contexts/user/application/search/by-id/search-user-by-id.query-handler';

const CommandHandlers = [
    BuildAccessInfoCommandHandler,
    LoginUserCommandHandler,
    RegisterUserCommandHandler,
    UpdateUserCardDesignCommandHandler,
];

const QueryHandlers = [
    SearchUserByIdQueryHandler,
];

export const UserCqrsConfig = [
    ...CommandHandlers,
    ...QueryHandlers,
];