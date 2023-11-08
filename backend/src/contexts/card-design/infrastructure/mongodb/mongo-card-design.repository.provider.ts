import {FactoryProvider} from '@nestjs/common';
import {MongoCardDesignRepository} from './mongo-card-design.repository';
import {MongodbConstants} from '../../../shared/infrastructure/mongodb/mongodb.constants';

export const MongoCardDesignRepositoryProvider: FactoryProvider<MongoCardDesignRepository> = {
    inject: [MongodbConstants.CARD_DESIGN_DOCUMENT],
    provide: MongoCardDesignRepository,
    useFactory(model): MongoCardDesignRepository {
        return new MongoCardDesignRepository(model);
    }
};