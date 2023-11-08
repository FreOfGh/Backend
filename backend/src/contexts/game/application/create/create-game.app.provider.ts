import {FactoryProvider} from '@nestjs/common';
import {CreateGameApp} from './create-game.app';
import {SearchUserByIdApp} from '../../../user/application/search/by-id/search-user-by-id.app';
import {MongoGameRepository} from '../../infrastructure/mongodb/mongo-game.repository';
import {IGameRepository} from '../../domain/i-game.repository';
import {UpdateUserApp} from '../../../user/application/update/update-user.app';
import {CreatePlayerApp} from '../../../player/application/create/create-player.app';

export const CreateGameAppProvider: FactoryProvider<CreateGameApp> = {
    inject: [
        SearchUserByIdApp,
        UpdateUserApp,
        CreatePlayerApp,
        MongoGameRepository,
    ],
    provide: CreateGameApp,
    useFactory(
        searchUserByIdApp: SearchUserByIdApp,
        updateUserApp: UpdateUserApp,
        createPlayerApp: CreatePlayerApp,
        repository: IGameRepository,
    ): CreateGameApp {
        return new CreateGameApp(
            searchUserByIdApp,
            updateUserApp,
            createPlayerApp,
            repository,
        );
    }
};