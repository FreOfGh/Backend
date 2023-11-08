import {FactoryProvider} from '@nestjs/common';
import {CreateGameApp} from './create-game.app';
import {SearchUserByIdApp} from '../../../user/application/search/by-id/search-user-by-id.app';
import {MongoGameRepository} from '../../infrastructure/mongodb/mongo-game.repository';
import {IGameRepository} from '../../domain/i-game.repository';
import {UpdateUserApp} from '../../../user/application/update/update-user.app';

export const CreateGameAppProvider: FactoryProvider<CreateGameApp> = {
    inject: [
        SearchUserByIdApp,
        UpdateUserApp,
        MongoGameRepository,
    ],
    provide: CreateGameApp,
    useFactory(
        searchUserByIdApp: SearchUserByIdApp,
        updateUserApp: UpdateUserApp,
        repository: IGameRepository,
    ): CreateGameApp {
        return new CreateGameApp(
            searchUserByIdApp,
            updateUserApp,
            repository,
        );
    }
};