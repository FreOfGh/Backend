import {FactoryProvider} from '@nestjs/common';
import {LeaveGameApp} from './leave-game.app';
import {SearchPlayerByUserApp} from '../../../player/application/search/by-user/search-player-by-user.app';
import {SearchGameByCodeApp} from '../search/by-code/search-game-by-code.app';
import {UpdateGameApp} from '../update/update-game.app';
import {MongoPlayerRepository} from '../../../player/infrastructure/mongodb/mongo-player.repository';
import {IPlayerRepository} from '../../../player/domain/i-player.repository';
import {SearchPlayersByGameApp} from '../../../player/application/search/by-game/search-players-by-game.app';
import {GameSocket} from '../../../../apps/game/sockets/game.socket';
import {SearchUserByIdApp} from '../../../user/application/search/by-id/search-user-by-id.app';
import {UpdateUserApp} from '../../../user/application/update/one/update-user.app';

export const LeaveGameAppProvider: FactoryProvider<LeaveGameApp> = {
    inject: [
        SearchPlayerByUserApp,
        SearchGameByCodeApp,
        UpdateGameApp,
        MongoPlayerRepository,
        SearchPlayersByGameApp,
        GameSocket,
        SearchUserByIdApp,
        UpdateUserApp,
    ],
    provide: LeaveGameApp,
    useFactory: (
        searchPlayerByUserApp: SearchPlayerByUserApp,
        searchGameByCodeApp: SearchGameByCodeApp,
        updateGameApp: UpdateGameApp,
        playerRepository: IPlayerRepository,
        searchPlayersByGameApp: SearchPlayersByGameApp,
        gameSocket: GameSocket,
        searchUserByIdApp: SearchUserByIdApp,
        updateUserApp: UpdateUserApp
    ) => {
        return new LeaveGameApp(
            searchPlayerByUserApp,
            searchGameByCodeApp,
            updateGameApp,
            playerRepository,
            searchPlayersByGameApp,
            gameSocket,
            searchUserByIdApp,
            updateUserApp,
        )
    }
}