import {FactoryProvider} from '@nestjs/common';
import {JoinGameRoomApp} from './join-game-room.app';
import {SearchGameByIdApp} from '../../search/by-id/search-game-by-id.app';
import {UpdateGameApp} from '../../update/update-game.app';
import {GameSocket} from '../../../../../apps/game/sockets/game.socket';
import {CreateMatchApp} from '../../../../match/application/create/create-match.app';
import {SearchStartPlayerApp} from '../../../../player/application/search/start/search-start-player.app';

export const JoinGameRoomAppProvider: FactoryProvider<JoinGameRoomApp> = {
    inject: [
        SearchGameByIdApp,
        SearchStartPlayerApp,
        UpdateGameApp,
        CreateMatchApp,
        GameSocket,
    ],
    provide: JoinGameRoomApp,
    useFactory(
        searchGameByIdApp: SearchGameByIdApp,
        searchStartPlayerApp: SearchStartPlayerApp,
        updateGameApp: UpdateGameApp,
        createMatchApp: CreateMatchApp,
        socket: GameSocket,
    ): JoinGameRoomApp {
        return new JoinGameRoomApp(
            searchGameByIdApp,
            searchStartPlayerApp,
            updateGameApp,
            createMatchApp,
            socket,
        );
    }
};