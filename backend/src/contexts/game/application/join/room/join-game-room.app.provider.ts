import {FactoryProvider} from '@nestjs/common';
import {JoinGameRoomApp} from './join-game-room.app';
import {SearchGameByIdApp} from '../../search/by-id/search-game-by-id.app';
import {UpdateGameApp} from '../../update/update-game.app';
import {GameSocket} from '../../../../../apps/game/sockets/game.socket';
import {CreateMatchApp} from '../../../../match/application/create/create-match.app';
import {
    SearchPlayerByPositionApp
} from '../../../../player/application/search/by-position/search-player-by-position.app';

export const JoinGameRoomAppProvider: FactoryProvider<JoinGameRoomApp> = {
    inject: [
        SearchGameByIdApp,
        SearchPlayerByPositionApp,
        UpdateGameApp,
        CreateMatchApp,
        GameSocket,
    ],
    provide: JoinGameRoomApp,
    useFactory(
        searchGameByIdApp: SearchGameByIdApp,
        searchPlayerByPositionApp: SearchPlayerByPositionApp,
        updateGameApp: UpdateGameApp,
        createMatchApp: CreateMatchApp,
        socket: GameSocket,
    ): JoinGameRoomApp {
        return new JoinGameRoomApp(
            searchGameByIdApp,
            searchPlayerByPositionApp,
            updateGameApp,
            createMatchApp,
            socket,
        );
    }
};