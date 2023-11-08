import {FactoryProvider} from '@nestjs/common';
import {RegisterUserApp} from './register-user.app';
import {MongoUserRepository} from '../../infrastructure/mongodb/mongo-user.repository';
import {IUserRepository} from '../../domain/i-user.repository';
import {IJwt} from '../../../shared/domain/i-jwt';
import {JwtService} from '@nestjs/jwt';
import {
    SearchDefaultCardDesignApp
} from '../../../card-design/application/search/default/search-default-card-design.app';

export const RegisterUserAppProvider: FactoryProvider<RegisterUserApp> = {
    inject: [
        SearchDefaultCardDesignApp,
        MongoUserRepository,
        JwtService,
    ],
    provide: RegisterUserApp,
    useFactory(
        searchDefaultCardDesignApp: SearchDefaultCardDesignApp,
        repository: IUserRepository,
        jwt: IJwt
    ): RegisterUserApp {
        return new RegisterUserApp(
            searchDefaultCardDesignApp,
            repository,
            jwt,
        );
    }
};