import {FactoryProvider} from '@nestjs/common';
import {SearchActiveMatchApp} from './search-active-match.app';
import {MongoMatchRepository} from '../../../infrastructure/mongodb/mongo-match.repository';
import {IMatchRepository} from '../../../domain/i-match.repository';

export const SearchActiveMatchAppProvider: FactoryProvider<SearchActiveMatchApp> = {
    inject: [MongoMatchRepository],
    provide: SearchActiveMatchApp,
    useFactory(repository: IMatchRepository): SearchActiveMatchApp {
        return new SearchActiveMatchApp(repository);
    }
};