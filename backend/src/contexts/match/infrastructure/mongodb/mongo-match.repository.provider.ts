import {FactoryProvider} from '@nestjs/common';
import {MongoMatchRepository} from './mongo-match.repository';
import {MongodbConstants} from '../../../shared/infrastructure/mongodb/mongodb.constants';

export const MongoMatchRepositoryProvider: FactoryProvider<MongoMatchRepository> = {
    inject: [MongodbConstants.MATCH_DOCUMENT],
    provide: MongoMatchRepository,
    useFactory(model): MongoMatchRepository {
        return new MongoMatchRepository(model);
    }
};