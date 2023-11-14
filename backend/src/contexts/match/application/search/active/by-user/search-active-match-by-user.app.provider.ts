import {FactoryProvider} from '@nestjs/common';
import {SearchActiveMatchByUserApp} from './search-active-match-by-user.app';
import {SearchPlayerByUserApp} from '../../../../../player/application/search/by-user/search-player-by-user.app';
import {SearchActiveMatchApp} from '../search-active-match.app';

export const SearchActiveMatchByUserAppProvider: FactoryProvider<SearchActiveMatchByUserApp> = {
    inject: [
        SearchPlayerByUserApp,
        SearchActiveMatchApp,
    ],
    provide: SearchActiveMatchByUserApp,
    useFactory(
        searchPlayerByUserApp: SearchPlayerByUserApp,
        searchActiveMatchApp: SearchActiveMatchApp,
    ): SearchActiveMatchByUserApp {
        return new SearchActiveMatchByUserApp(searchPlayerByUserApp, searchActiveMatchApp);
    }
};