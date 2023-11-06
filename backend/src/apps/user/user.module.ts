import {Module} from '@nestjs/common';
import {SharedModule} from '../shared/shared.module';
import {UserDocumentProvider} from '../../contexts/user/infrastructure/mongodb/user-document.provider';
import {MongoUserRepositoryProvider} from '../../contexts/user/infrastructure/mongodb/mongo-user.repository.provider';
import {RegisterUserController} from './controllers/register/register-user.controller';
import {UserCqrsConfig} from './config/user-cqrs.config';
import {RegisterUserAppProvider} from '../../contexts/user/application/register/register-user.app.provider';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule} from '@nestjs/config';

@Module({
    imports: [
        SharedModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: process.env.JWT_EXPIRATION_TIME},
        }),
    ],
    controllers: [
        RegisterUserController,
    ],
    providers: [
        UserDocumentProvider,
        MongoUserRepositoryProvider,
        ...UserCqrsConfig,
        RegisterUserAppProvider,
    ]
})
export class UserModule {
}