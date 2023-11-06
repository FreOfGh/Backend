import {FactoryProvider} from '@nestjs/common';
import {MongoGameRepository} from './mongo-game.repository';
import {MongodbConstants} from '../../../shared/infrastructure/mongodb/mongodb.constants';
import {MongoUserRepository} from '../../../user/infrastructure/mongodb/mongo-user.repository';

export const MongoGameRepositoryProvider: FactoryProvider<MongoGameRepository> = {
    inject: [MongodbConstants.GAME_DOCUMENT],
    provide: MongoUserRepository,
    useFactory(model): MongoGameRepository {
        return new MongoGameRepository(model);
    }
};