import {FactoryProvider} from '@nestjs/common';
import {UpdateMatchApp} from './update-match.app';
import {MongoMatchRepository} from '../../infrastructure/mongodb/mongo-match.repository';
import {IMatchRepository} from '../../domain/i-match.repository';

export const UpdateMatchAppProvider: FactoryProvider<UpdateMatchApp> = {
    inject: [MongoMatchRepository],
    provide: UpdateMatchApp,
    useFactory(repository: IMatchRepository): UpdateMatchApp {
        return new UpdateMatchApp(repository);
    }
};