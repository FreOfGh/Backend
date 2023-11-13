import {FactoryProvider} from '@nestjs/common';
import {UpdatePlayerApp} from './update-player.app';
import {MongoPlayerRepository} from '../../infrastructure/mongodb/mongo-player.repository';
import {IPlayerRepository} from '../../domain/i-player.repository';

export const UpdatePlayerAppProvider: FactoryProvider<UpdatePlayerApp> = {
    inject: [MongoPlayerRepository],
    provide: UpdatePlayerApp,
    useFactory(repository: IPlayerRepository): UpdatePlayerApp {
        return new UpdatePlayerApp(repository);
    }
};