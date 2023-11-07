import {FactoryProvider} from '@nestjs/common';
import {SearchUserByIdApp} from './search-user-by-id.app';
import {MongoUserRepository} from '../../../infrastructure/mongodb/mongo-user.repository';
import {IUserRepository} from '../../../domain/i-user.repository';

export const SearchUserByIdAppProvider: FactoryProvider<SearchUserByIdApp> = {
    inject: [MongoUserRepository],
    provide: SearchUserByIdApp,
    useFactory(repository: IUserRepository): SearchUserByIdApp {
        return new SearchUserByIdApp(repository);
    }
};