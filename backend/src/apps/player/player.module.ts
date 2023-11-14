import {forwardRef, Module} from '@nestjs/common';
import {SharedModule} from '../shared/shared.module';
import {PlayerDocumentProvider} from '../../contexts/player/infrastructure/mongodb/player-document.provider';
import {
    MongoPlayerRepositoryProvider
} from '../../contexts/player/infrastructure/mongodb/mongo-player.repository.provider';
import {PlayerCqrsConfig} from './config/player-cqrs.config';
import {
    SearchPlayerByUserAppProvider
} from '../../contexts/player/application/search/by-user/search-player-by-user.app.provider';
import {CreatePlayerAppProvider} from '../../contexts/player/application/create/create-player.app.provider';
import {
    SearchPlayerByUserQueryHandler
} from '../../contexts/player/application/search/by-user/search-player-by-user.query-handler';
import {
    SearchPlayersByGameAppProvider
} from '../../contexts/player/application/search/by-game/search-players-by-game.app.provider';
import {UpdatePlayerAppProvider} from '../../contexts/player/application/update/update-player.app.provider';
import {
    SearchPlayerByPositionAppProvider
} from '../../contexts/player/application/search/by-position/search-player-by-position.app.provider';
import {SearchPlayersByGameController} from './controllers/search/by-game/search-players-by-game.controller';
import {ThrowCardCommandHandler} from '../../contexts/player/application/throw-card/throw-card.command-handler';
import {ThrowCardAppProvider} from '../../contexts/player/application/throw-card/throw-card.app.provider';
import {MatchModule} from '../match/match.module';
import {GameModule} from '../game/game.module';
import {PullCardFromDeckController} from './controllers/pull-card/from-deck/pull-card-from-deck.controller';
import {
    PullCardFromDeckAppProvider
} from '../../contexts/player/application/pull-card/from-deck/pull-card-from-deck.app.provider';

@Module({
    imports: [
        SharedModule,
        MatchModule,
        forwardRef(() => GameModule),
    ],
    controllers: [
        PullCardFromDeckController,
        SearchPlayersByGameController,
    ],
    providers: [
        PlayerDocumentProvider,
        MongoPlayerRepositoryProvider,
        ...PlayerCqrsConfig,
        CreatePlayerAppProvider,
        SearchPlayerByUserAppProvider,
        SearchPlayersByGameAppProvider,
        UpdatePlayerAppProvider,
        SearchPlayerByPositionAppProvider,
        ThrowCardAppProvider,
        PullCardFromDeckAppProvider,
    ],
    exports: [
        SearchPlayerByUserQueryHandler,
        ThrowCardCommandHandler,
        CreatePlayerAppProvider,
        SearchPlayersByGameAppProvider,
        UpdatePlayerAppProvider,
        SearchPlayerByPositionAppProvider,
    ]
})
export class PlayerModule {
}