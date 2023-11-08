import {FactoryProvider} from '@nestjs/common';
import {CreatePlayerApp} from './create-player.app';
import {SearchPlayerByUserApp} from '../search/by-user/search-player-by-user.app';
import {MongoPlayerRepository} from '../../infrastructure/mongodb/mongo-player.repository';
import {IPlayerRepository} from '../../domain/i-player.repository';

export const CreatePlayerAppProvider: FactoryProvider<CreatePlayerApp> = {
    inject: [
        SearchPlayerByUserApp,
        MongoPlayerRepository,
    ],
    provide: CreatePlayerApp, useFactory(
        searchPlayerByUserApp: SearchPlayerByUserApp,
        repository: IPlayerRepository,
    ): CreatePlayerApp {
        return new CreatePlayerApp(searchPlayerByUserApp, repository);
    }
};