import {Module} from '@nestjs/common';
import {SharedModule} from '../shared/shared.module';
import {PlayerDocumentProvider} from '../../contexts/player/infrastructure/mongodb/player-document.provider';
import {
    MongoPlayerRepositoryProvider
} from '../../contexts/player/infrastructure/mongodb/mongo-player.repository.provider';
import {PlayerCqrsConfig} from './config/player-cqrs.config';

@Module({
    imports: [
        SharedModule,
    ],
    providers: [
        PlayerDocumentProvider,
        MongoPlayerRepositoryProvider,
        ...PlayerCqrsConfig,
    ]
})
export class PlayerModule {
}