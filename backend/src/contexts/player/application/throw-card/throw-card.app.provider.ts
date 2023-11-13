import {FactoryProvider} from '@nestjs/common';
import {ThrowCardApp} from './throw-card.app';
import {SearchPlayerByUserApp} from '../search/by-user/search-player-by-user.app';
import {SearchActiveMatchApp} from '../../../match/application/search/active/search-active-match.app';
import {UpdateMatchApp} from '../../../match/application/update/update-match.app';
import {UpdatePlayerApp} from '../update/update-player.app';
import {SearchPlayerByPositionApp} from '../search/by-position/search-player-by-position.app';
import {GameSocket} from '../../../../apps/game/sockets/game.socket';

export const ThrowCardAppProvider: FactoryProvider<ThrowCardApp> = {
    inject: [
        SearchPlayerByUserApp,
        SearchActiveMatchApp,
        UpdateMatchApp,
        UpdatePlayerApp,
        SearchPlayerByPositionApp,
        GameSocket,
    ],
    provide: ThrowCardApp,
    useFactory(
        searchPlayerByUserApp: SearchPlayerByUserApp,
        searchActiveMatchApp: SearchActiveMatchApp,
        updateMatchApp: UpdateMatchApp,
        updatePlayerApp: UpdatePlayerApp,
        searchPlayerByPositionApp: SearchPlayerByPositionApp,
        socket: GameSocket,
    ): ThrowCardApp {
        return new ThrowCardApp(
            searchPlayerByUserApp,
            searchActiveMatchApp,
            updateMatchApp,
            updatePlayerApp,
            searchPlayerByPositionApp,
            socket,
        );
    }
};