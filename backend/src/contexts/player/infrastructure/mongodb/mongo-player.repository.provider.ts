import {FactoryProvider} from '@nestjs/common';
import {MongoPlayerRepository} from './mongo-player.repository';
import {MongodbConstants} from '../../../shared/infrastructure/mongodb/mongodb.constants';

export const MongoPlayerRepositoryProvider: FactoryProvider<MongoPlayerRepository> = {
    inject: [MongodbConstants.PLAYER_DOCUMENT],
    provide: MongoPlayerRepository,
    useFactory(model): MongoPlayerRepository {
        return new MongoPlayerRepository(model);
    }
};