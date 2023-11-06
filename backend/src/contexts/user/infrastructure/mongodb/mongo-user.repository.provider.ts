import {FactoryProvider} from '@nestjs/common';
import {MongoUserRepository} from './mongo-user.repository';
import {MongodbConstants} from '../../../shared/infrastructure/mongodb/mongodb.constants';

export const MongoUserRepositoryProvider: FactoryProvider<MongoUserRepository> = {
    inject: [MongodbConstants.USER_DOCUMENT],
    provide: MongoUserRepository,
    useFactory(model): MongoUserRepository {
        return new MongoUserRepository(model);
    }
};