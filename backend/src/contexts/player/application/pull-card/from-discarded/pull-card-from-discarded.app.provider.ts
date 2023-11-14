import {FactoryProvider} from '@nestjs/common';
import {PullCardFromDiscardedApp} from './pull-card-from-discarded.app';
import {SearchPlayerByUserApp} from '../../search/by-user/search-player-by-user.app';
import {SearchActiveMatchApp} from '../../../../match/application/search/active/search-active-match.app';
import {UpdatePlayerApp} from '../../update/update-player.app';
import {UpdateMatchApp} from '../../../../match/application/update/update-match.app';

export const PullCardFromDiscardedAppProvider: FactoryProvider<PullCardFromDiscardedApp> = {
    inject: [
        SearchPlayerByUserApp,
        SearchActiveMatchApp,
        UpdatePlayerApp,
        UpdateMatchApp,
    ],
    provide: PullCardFromDiscardedApp,
    useFactory(
        searchPlayerByUserApp: SearchPlayerByUserApp,
        searchActiveMatchApp: SearchActiveMatchApp,
        updatePlayerApp: UpdatePlayerApp,
        updateMatchApp: UpdateMatchApp,
    ): PullCardFromDiscardedApp {
        return new PullCardFromDiscardedApp(
            searchPlayerByUserApp,
            searchActiveMatchApp,
            updatePlayerApp,
            updateMatchApp,
        );
    }
};