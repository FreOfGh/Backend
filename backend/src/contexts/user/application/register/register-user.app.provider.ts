import {FactoryProvider} from '@nestjs/common';
import {RegisterUserApp} from './register-user.app';
import {MongoUserRepository} from '../../infrastructure/mongodb/mongo-user.repository';
import {IUserRepository} from '../../domain/i-user.repository';
import {IJwt} from '../../../shared/domain/i-jwt';
import {JwtService} from '@nestjs/jwt';

export const RegisterUserAppProvider: FactoryProvider<RegisterUserApp> = {
    inject: [
        MongoUserRepository,
        JwtService,
    ],
    provide: RegisterUserApp,
    useFactory(
        repository: IUserRepository,
        jwt: IJwt
    ): RegisterUserApp {
        return new RegisterUserApp(
            repository,
            jwt,
        );
    }
};