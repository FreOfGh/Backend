import {FactoryProvider} from '@nestjs/common';
import {SearchPlayerByUserApp} from './search-player-by-user.app';
import {MongoPlayerRepository} from '../../../infrastructure/mongodb/mongo-player.repository';
import {IPlayerRepository} from '../../../domain/i-player.repository';

export const SearchPlayerByUserAppProvider: FactoryProvider<SearchPlayerByUserApp> = {
    inject: [MongoPlayerRepository],
    provide: SearchPlayerByUserApp,
    useFactory(repository: IPlayerRepository): SearchPlayerByUserApp {
        return new SearchPlayerByUserApp(repository);
    }
};