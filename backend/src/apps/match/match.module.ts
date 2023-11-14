import {forwardRef, Module} from '@nestjs/common';
import {SharedModule} from '../shared/shared.module';
import {MatchDocumentProvider} from '../../contexts/match/infrastructure/mongodb/match-document.provider';
import {
    MongoMatchRepositoryProvider
} from '../../contexts/match/infrastructure/mongodb/mongo-match.repository.provider';
import {CreateMatchAppProvider} from '../../contexts/match/application/create/create-match.app.provider';
import {PlayerModule} from '../player/player.module';
import {
    SearchActiveMatchAppProvider
} from '../../contexts/match/application/search/active/search-active-match.app.provider';
import {UpdateMatchAppProvider} from '../../contexts/match/application/update/update-match.app.provider';
import {MatchCqrsConfig} from './config/match-cqrs.config';
import {
    SearchActiveMatchByUserController
} from './controllers/search/active/by-user/search-active-match-by-user.controller';
import {
    SearchActiveMatchByUserAppProvider
} from '../../contexts/match/application/search/active/by-user/search-active-match-by-user.app.provider';

@Module({
    imports: [
        SharedModule,
        forwardRef(() => PlayerModule),
    ],
    controllers: [SearchActiveMatchByUserController],
    providers: [
        MatchDocumentProvider,
        MongoMatchRepositoryProvider,
        ...MatchCqrsConfig,
        CreateMatchAppProvider,
        SearchActiveMatchAppProvider,
        SearchActiveMatchByUserAppProvider,
        UpdateMatchAppProvider,
    ],
    exports: [
        CreateMatchAppProvider,
        SearchActiveMatchAppProvider,
        UpdateMatchAppProvider,
    ]
})
export class MatchModule {
}