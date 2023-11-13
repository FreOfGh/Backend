import {FactoryProvider} from '@nestjs/common';
import {SearchPlayerByPositionApp} from './search-player-by-position.app';
import {MongoPlayerRepository} from '../../../infrastructure/mongodb/mongo-player.repository';
import {IPlayerRepository} from '../../../domain/i-player.repository';

export const SearchPlayerByPositionAppProvider: FactoryProvider<SearchPlayerByPositionApp> = {
    inject: [MongoPlayerRepository],
    provide: SearchPlayerByPositionApp,
    useFactory(repository: IPlayerRepository): SearchPlayerByPositionApp {
        return new SearchPlayerByPositionApp(repository);
    }
};