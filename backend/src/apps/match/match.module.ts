import {Module} from '@nestjs/common';
import {SharedModule} from '../shared/shared.module';
import {MatchDocumentProvider} from '../../contexts/match/infrastructure/mongodb/match-document.provider';
import {
    MongoMatchRepositoryProvider
} from '../../contexts/match/infrastructure/mongodb/mongo-match.repository.provider';
import {CreateMatchAppProvider} from '../../contexts/match/application/create/create-match.app.provider';
import {PlayerModule} from '../player/player.module';

@Module({
    imports: [
        SharedModule,
        PlayerModule,
    ],
    providers: [
        MatchDocumentProvider,
        MongoMatchRepositoryProvider,
        CreateMatchAppProvider,
    ],
    exports: [
        CreateMatchAppProvider,
    ]
})
export class MatchModule {
}