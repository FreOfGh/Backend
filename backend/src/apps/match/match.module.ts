import {Module} from '@nestjs/common';
import {SharedModule} from '../shared/shared.module';
import {MatchDocumentProvider} from '../../contexts/match/infrastructure/mongodb/match-document.provider';
import {
    MongoMatchRepositoryProvider
} from '../../contexts/match/infrastructure/mongodb/mongo-match.repository.provider';

@Module({
    imports: [SharedModule],
    providers: [
        MatchDocumentProvider,
        MongoMatchRepositoryProvider,
    ]
})
export class MatchModule {
}