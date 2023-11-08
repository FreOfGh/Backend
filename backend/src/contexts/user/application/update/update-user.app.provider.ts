import {FactoryProvider} from '@nestjs/common';
import {UpdateUserApp} from './update-user.app';
import {MongoUserRepository} from '../../infrastructure/mongodb/mongo-user.repository';
import {IUserRepository} from '../../domain/i-user.repository';

export const UpdateUserAppProvider: FactoryProvider<UpdateUserApp> = {
    inject: [MongoUserRepository],
    provide: UpdateUserApp,
    useFactory(repository: IUserRepository): UpdateUserApp {
        return new UpdateUserApp(repository);
    }
};