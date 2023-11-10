import {Module} from '@nestjs/common';
import {SharedModule} from '../shared/shared.module';
import {UserDocumentProvider} from '../../contexts/user/infrastructure/mongodb/user-document.provider';
import {MongoUserRepositoryProvider} from '../../contexts/user/infrastructure/mongodb/mongo-user.repository.provider';
import {RegisterUserController} from './controllers/register/register-user.controller';
import {UserCqrsConfig} from './config/user-cqrs.config';
import {RegisterUserAppProvider} from '../../contexts/user/application/register/register-user.app.provider';
import {JwtModule} from '@nestjs/jwt';
import {LoginUserController} from './controllers/login/login-user.controller';
import {LoginStrategy} from '../../contexts/user/infrastructure/passport/login.strategy';
import {LoginUserAppProvider} from '../../contexts/user/application/login/login-user.app.provider';
import {BuildAccessInfoAppProvider} from '../../contexts/user/application/build/build-access-info.app.provider';
import {SearchUserByIdAppProvider} from '../../contexts/user/application/search/by-id/search-user-by-id.app.provider';
import {UpdateUserAppProvider} from '../../contexts/user/application/update/one/update-user.app.provider';
import {CardDesignModule} from '../card-design/card-design.module';
import {
    UpdateUserCardDesignAppProvider
} from '../../contexts/user/application/update/card-design/update-user-card-design.app.provider';
import {UpdateUserCardDesignController} from './controllers/update/card-design/update-user-card-design.controller';
import {SearchUserByIdController} from './controllers/search/by-id/search-user-by-id.controller';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: process.env.JWT_EXPIRATION_TIME},
        }),
        SharedModule,
        CardDesignModule,
    ],
    controllers: [
        LoginUserController,
        RegisterUserController,
        UpdateUserCardDesignController,
        SearchUserByIdController,
    ],
    providers: [
        LoginStrategy,
        UserDocumentProvider,
        MongoUserRepositoryProvider,
        ...UserCqrsConfig,
        BuildAccessInfoAppProvider,
        LoginUserAppProvider,
        RegisterUserAppProvider,
        SearchUserByIdAppProvider,
        UpdateUserAppProvider,
        UpdateUserCardDesignAppProvider,
    ],
    exports: [
        SearchUserByIdAppProvider,
        UpdateUserAppProvider,
    ]
})
export class UserModule {
}