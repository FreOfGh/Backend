import {forwardRef, Module} from '@nestjs/common';
import {SharedModule} from '../shared/shared.module';
import {GameDocumentProvider} from '../../contexts/game/infrastructure/mongodb/game-document.provider';
import {MongoGameRepositoryProvider} from '../../contexts/game/infrastructure/mongodb/mongo-game.repository.provider';
import {GameCqrsConfig} from './config/game-cqrs.config';
import {SearchPublicGamesController} from './controllers/search/public/search-public-games.controller';
import {
    SearchPublicGamesAppProvider
} from '../../contexts/game/application/search/public/search-public-games.app.provider';
import {UserModule} from '../user/user.module';
import {CreateGameController} from './controllers/create/create-game.controller';
import {CreateGameAppProvider} from '../../contexts/game/application/create/create-game.app.provider';
import {PlayerModule} from '../player/player.module';
import {
    SearchGameByCodeAppProvider
} from '../../contexts/game/application/search/by-code/search-game-by-code.app.provider';
import {UpdateGameAppProvider} from '../../contexts/game/application/update/update-game.app.provider';
import {JoinGameAppProvider} from '../../contexts/game/application/join/join-game.app.provider';
import {JoinGameController} from './controllers/join/join-game.controller';
import {JoinGameRoomAppProvider} from '../../contexts/game/application/join/room/join-game-room.app.provider';
import {SearchGameByIdAppProvider} from '../../contexts/game/application/search/by-id/search-game-by-id.app.provider';
import {GameSocket} from './sockets/game.socket';
import {JwtModule} from '@nestjs/jwt';
import {MatchModule} from '../match/match.module';

@Module({
    imports: [
        JwtModule,
        SharedModule,
        UserModule,
        forwardRef(() => PlayerModule),
        MatchModule,
    ],
    controllers: [
        CreateGameController,
        JoinGameController,
        SearchPublicGamesController,
    ],
    providers: [
        GameSocket,
        GameDocumentProvider,
        MongoGameRepositoryProvider,
        ...GameCqrsConfig,
        CreateGameAppProvider,
        SearchPublicGamesAppProvider,
        SearchGameByCodeAppProvider,
        UpdateGameAppProvider,
        JoinGameAppProvider,
        JoinGameRoomAppProvider,
        SearchGameByIdAppProvider,
    ],
    exports: [GameSocket]
})
export class GameModule {
}