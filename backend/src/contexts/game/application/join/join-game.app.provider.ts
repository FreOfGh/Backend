import {FactoryProvider} from '@nestjs/common';
import {JoinGameApp} from './join-game.app';
import {SearchGameByCodeApp} from '../search/by-code/search-game-by-code.app';
import {SearchUserByIdApp} from '../../../user/application/search/by-id/search-user-by-id.app';
import {UpdateUserApp} from '../../../user/application/update/one/update-user.app';
import {CreatePlayerApp} from '../../../player/application/create/create-player.app';
import {UpdateGameApp} from '../update/update-game.app';

export const JoinGameAppProvider: FactoryProvider<JoinGameApp> = {
    inject: [
        SearchGameByCodeApp,
        SearchUserByIdApp,
        UpdateUserApp,
        CreatePlayerApp,
        UpdateGameApp,
    ],
    provide: JoinGameApp,
    useFactory(
        searchGameByCodeApp: SearchGameByCodeApp,
        searchUserByIdApp: SearchUserByIdApp,
        updateUserApp: UpdateUserApp,
        createPlayerApp: CreatePlayerApp,
        updateGameApp: UpdateGameApp,
    ): JoinGameApp {
        return new JoinGameApp(
            searchGameByCodeApp,
            searchUserByIdApp,
            updateUserApp,
            createPlayerApp,
            updateGameApp,
        );
    }
};