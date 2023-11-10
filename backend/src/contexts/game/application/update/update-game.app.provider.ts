import {FactoryProvider} from '@nestjs/common';
import {UpdateGameApp} from './update-game.app';
import {MongoGameRepository} from '../../infrastructure/mongodb/mongo-game.repository';
import {IGameRepository} from '../../domain/i-game.repository';

export const UpdateGameAppProvider: FactoryProvider<UpdateGameApp> = {
    inject: [MongoGameRepository],
    provide: UpdateGameApp,
    useFactory(repository: IGameRepository): UpdateGameApp {
        return new UpdateGameApp(repository);
    }
};