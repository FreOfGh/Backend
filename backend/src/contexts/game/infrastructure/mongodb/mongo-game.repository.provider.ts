import {FactoryProvider} from '@nestjs/common';
import {MongoGameRepository} from './mongo-game.repository';
import {MongodbConstants} from '../../../shared/infrastructure/mongodb/mongodb.constants';

export const MongoGameRepositoryProvider: FactoryProvider<MongoGameRepository> = {
    inject: [MongodbConstants.GAME_DOCUMENT],
    provide: MongoGameRepository,
    useFactory(model): MongoGameRepository {
        return new MongoGameRepository(model);
    }
};