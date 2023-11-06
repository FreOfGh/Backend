import {Module} from '@nestjs/common';
import {SharedModule} from '../shared/shared.module';
import {GameDocumentProvider} from '../../contexts/game/infrastructure/mongodb/game-document.provider';
import {MongoGameRepositoryProvider} from '../../contexts/game/infrastructure/mongodb/mongo-game.repository.provider';
import {GameCqrsConfig} from './config/game-cqrs.config';

@Module({
    imports: [SharedModule],
    providers: [
        GameDocumentProvider,
        MongoGameRepositoryProvider,
        ...GameCqrsConfig,
    ]
})
export class GameModule {
}