import {FactoryProvider} from '@nestjs/common';
import {JoinGameRoomApp} from './join-game-room.app';
import {SearchGameByIdApp} from '../../search/by-id/search-game-by-id.app';
import {UpdateGameApp} from '../../update/update-game.app';
import {GameSocket} from '../../../../../apps/game/sockets/game.socket';

export const JoinGameRoomAppProvider: FactoryProvider<JoinGameRoomApp> = {
    inject: [
        SearchGameByIdApp,
        UpdateGameApp,
        GameSocket,
    ],
    provide: JoinGameRoomApp,
    useFactory(
        searchGameByIdApp: SearchGameByIdApp,
        updateGameApp: UpdateGameApp,
        socket: GameSocket,
    ): JoinGameRoomApp {
        return new JoinGameRoomApp(
            searchGameByIdApp,
            updateGameApp,
            socket,
        );
    }
};