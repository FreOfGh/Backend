import {FactoryProvider} from '@nestjs/common';
import {SearchActiveCardDesignsApp} from './search-active-card-designs.app';
import {MongoCardDesignRepository} from '../../../infrastructure/mongodb/mongo-card-design.repository';
import {ICardDesignRepository} from '../../../domain/i-card-design.repository';

export const SearchActiveCardDesignsAppProvider: FactoryProvider<SearchActiveCardDesignsApp> = {
    inject: [MongoCardDesignRepository],
    provide: SearchActiveCardDesignsApp,
    useFactory(repository: ICardDesignRepository): SearchActiveCardDesignsApp {
        return new SearchActiveCardDesignsApp(repository);
    }
};