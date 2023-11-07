import {FactoryProvider} from '@nestjs/common';
import {SearchPublicGamesApp} from './search-public-games.app';
import {MongoGameRepository} from '../../../infrastructure/mongodb/mongo-game.repository';
import {IGameRepository} from '../../../domain/i-game.repository';

export const SearchPublicGamesAppProvider: FactoryProvider<SearchPublicGamesApp> = {
    inject: [MongoGameRepository],
    provide: SearchPublicGamesApp,
    useFactory(repository: IGameRepository): SearchPublicGamesApp {
        return new SearchPublicGamesApp(repository);
    }
};