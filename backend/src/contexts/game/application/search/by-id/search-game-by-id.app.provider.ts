import {FactoryProvider} from '@nestjs/common';
import {SearchGameByIdApp} from './search-game-by-id.app';
import {MongoGameRepository} from '../../../infrastructure/mongodb/mongo-game.repository';
import {IGameRepository} from '../../../domain/i-game.repository';

export const SearchGameByIdAppProvider: FactoryProvider<SearchGameByIdApp> = {
    inject: [MongoGameRepository],
    provide: SearchGameByIdApp,
    useFactory(repository: IGameRepository): SearchGameByIdApp {
        return new SearchGameByIdApp(repository);
    }
};