import {FactoryProvider} from '@nestjs/common';
import {CreateMatchApp} from './create-match.app';
import {MongoMatchRepository} from '../../infrastructure/mongodb/mongo-match.repository';
import {IMatchRepository} from '../../domain/i-match.repository';
import {SearchPlayersByGameApp} from '../../../player/application/search/by-game/search-players-by-game.app';
import {UpdatePlayerApp} from '../../../player/application/update/update-player.app';

export const CreateMatchAppProvider: FactoryProvider<CreateMatchApp> = {
    inject: [
        SearchPlayersByGameApp,
        UpdatePlayerApp,
        MongoMatchRepository,
    ],
    provide: CreateMatchApp,
    useFactory(
        searchPlayersByGameApp: SearchPlayersByGameApp,
        updatePlayerApp: UpdatePlayerApp,
        repository: IMatchRepository,
    ): CreateMatchApp {
        return new CreateMatchApp(
            searchPlayersByGameApp,
            updatePlayerApp,
            repository,
        );
    }
};