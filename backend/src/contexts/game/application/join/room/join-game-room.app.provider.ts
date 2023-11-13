import {FactoryProvider} from '@nestjs/common';
import {JoinGameRoomApp} from './join-game-room.app';
import {SearchGameByIdApp} from '../../search/by-id/search-game-by-id.app';
import {UpdateGameApp} from '../../update/update-game.app';
import {GameSocket} from '../../../../../apps/game/sockets/game.socket';
import {SearchPlayersByGameApp} from '../../../../player/application/search/by-game/search-players-by-game.app';

export const JoinGameRoomAppProvider: FactoryProvider<JoinGameRoomApp> = {
    inject: [
        SearchGameByIdApp,
        UpdateGameApp,
        SearchPlayersByGameApp,
        GameSocket,
    ],
    provide: JoinGameRoomApp,
    useFactory(
        searchGameByIdApp: SearchGameByIdApp,
        updateGameApp: UpdateGameApp,
        searchPlayersByGameAppProvider: SearchPlayersByGameApp,
        socket: GameSocket,
    ): JoinGameRoomApp {
        return new JoinGameRoomApp(
            searchGameByIdApp,
            updateGameApp,
            searchPlayersByGameAppProvider,
            socket,
        );
    }
};