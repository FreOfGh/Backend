import {FactoryProvider} from '@nestjs/common';
import {CreateGameApp} from './create-game.app';
import {SearchUserByIdApp} from '../../../user/application/search/by-id/search-user-by-id.app';
import {MongoGameRepository} from '../../infrastructure/mongodb/mongo-game.repository';
import {IGameRepository} from '../../domain/i-game.repository';

export const CreateGameAppProvider: FactoryProvider<CreateGameApp> = {
    inject: [SearchUserByIdApp, MongoGameRepository],
    provide: CreateGameApp,
    useFactory(
        searchUserByIdApp: SearchUserByIdApp,
        repository: IGameRepository,
    ): CreateGameApp {
        return new CreateGameApp(searchUserByIdApp, repository);
    }
};