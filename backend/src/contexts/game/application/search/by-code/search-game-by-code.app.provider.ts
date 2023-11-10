import {FactoryProvider} from '@nestjs/common';
import {SearchGameByCodeApp} from './search-game-by-code.app';
import {MongoGameRepository} from '../../../infrastructure/mongodb/mongo-game.repository';
import {IGameRepository} from '../../../domain/i-game.repository';

export const SearchGameByCodeAppProvider: FactoryProvider<SearchGameByCodeApp> = {
    inject: [MongoGameRepository],
    provide: SearchGameByCodeApp,
    useFactory(repository: IGameRepository): SearchGameByCodeApp {
        return new SearchGameByCodeApp(repository);
    }
};