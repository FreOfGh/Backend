import {Module} from '@nestjs/common';
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
    SearchStartPlayerAppProvider
} from '../../contexts/player/application/search/start/search-start-player.app.provider';

@Module({
    imports: [
        SharedModule,
    ],
    providers: [
        PlayerDocumentProvider,
        MongoPlayerRepositoryProvider,
        ...PlayerCqrsConfig,
        CreatePlayerAppProvider,
        SearchPlayerByUserAppProvider,
        SearchPlayersByGameAppProvider,
        UpdatePlayerAppProvider,
        SearchStartPlayerAppProvider,
    ],
    exports: [
        SearchPlayerByUserQueryHandler,
        CreatePlayerAppProvider,
        SearchPlayersByGameAppProvider,
        UpdatePlayerAppProvider,
        SearchStartPlayerAppProvider,
    ]
})
export class PlayerModule {
}