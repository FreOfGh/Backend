import {FactoryProvider} from '@nestjs/common';
import {SearchPlayersByGameApp} from './search-players-by-game.app';
import {MongoPlayerRepository} from '../../../infrastructure/mongodb/mongo-player.repository';
import {IPlayerRepository} from '../../../domain/i-player.repository';

export const SearchPlayersByGameAppProvider: FactoryProvider<SearchPlayersByGameApp> = {
    inject: [MongoPlayerRepository],
    provide: SearchPlayersByGameApp,
    useFactory(repository: IPlayerRepository): SearchPlayersByGameApp {
        return new SearchPlayersByGameApp(repository);
    }
};