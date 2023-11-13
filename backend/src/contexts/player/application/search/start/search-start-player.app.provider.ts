import {FactoryProvider} from '@nestjs/common';
import {SearchStartPlayerApp} from './search-start-player.app';
import {MongoPlayerRepository} from '../../../infrastructure/mongodb/mongo-player.repository';
import {IPlayerRepository} from '../../../domain/i-player.repository';

export const SearchStartPlayerAppProvider: FactoryProvider<SearchStartPlayerApp> = {
    inject: [MongoPlayerRepository],
    provide: SearchStartPlayerApp,
    useFactory(repository: IPlayerRepository): SearchStartPlayerApp {
        return new SearchStartPlayerApp(repository);
    }
};