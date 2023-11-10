import {Module} from '@nestjs/common';
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

@Module({
    imports: [
        SharedModule,
        UserModule,
        PlayerModule,
    ],
    controllers: [
        CreateGameController,
        JoinGameController,
        SearchPublicGamesController,
    ],
    providers: [
        GameDocumentProvider,
        MongoGameRepositoryProvider,
        ...GameCqrsConfig,
        CreateGameAppProvider,
        SearchPublicGamesAppProvider,
        SearchGameByCodeAppProvider,
        UpdateGameAppProvider,
        JoinGameAppProvider,
    ]
})
export class GameModule {
}