import {FactoryProvider} from '@nestjs/common';
import {LoginUserApp} from './login-user.app';
import {MongoUserRepository} from '../../infrastructure/mongodb/mongo-user.repository';
import {IUserRepository} from '../../domain/i-user.repository';

export const LoginUserAppProvider: FactoryProvider<LoginUserApp> = {
    inject: [MongoUserRepository],
    provide: LoginUserApp,
    useFactory(repository: IUserRepository): LoginUserApp {
        return new LoginUserApp(repository);
    }
};