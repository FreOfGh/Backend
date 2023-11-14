import {FactoryProvider} from '@nestjs/common';
import {PullCardFromDeckApp} from './pull-card-from-deck.app';
import {SearchPlayerByUserApp} from '../../search/by-user/search-player-by-user.app';
import {SearchActiveMatchApp} from '../../../../match/application/search/active/search-active-match.app';
import {UpdatePlayerApp} from '../../update/update-player.app';
import {UpdateMatchApp} from '../../../../match/application/update/update-match.app';

export const PullCardFromDeckAppProvider: FactoryProvider<PullCardFromDeckApp> = {
    inject: [
        SearchPlayerByUserApp,
        SearchActiveMatchApp,
        UpdatePlayerApp,
        UpdateMatchApp,
    ],
    provide: PullCardFromDeckApp,
    useFactory(
        searchPlayerByUserApp: SearchPlayerByUserApp,
        searchActiveMatchApp: SearchActiveMatchApp,
        updatePlayerApp: UpdatePlayerApp,
        updateMatchApp: UpdateMatchApp,
    ): PullCardFromDeckApp {
        return new PullCardFromDeckApp(
            searchPlayerByUserApp,
            searchActiveMatchApp,
            updatePlayerApp,
            updateMatchApp,
        );
    }
};