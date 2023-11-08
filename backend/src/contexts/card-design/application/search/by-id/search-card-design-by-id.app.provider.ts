import {FactoryProvider} from '@nestjs/common';
import {SearchCardDesignByIdApp} from './search-card-design-by-id.app';
import {MongoCardDesignRepository} from '../../../infrastructure/mongodb/mongo-card-design.repository';
import {ICardDesignRepository} from '../../../domain/i-card-design.repository';

export const SearchCardDesignByIdAppProvider: FactoryProvider<SearchCardDesignByIdApp> = {
    inject: [MongoCardDesignRepository],
    provide: SearchCardDesignByIdApp,
    useFactory(repository: ICardDesignRepository): SearchCardDesignByIdApp {
        return new SearchCardDesignByIdApp(repository);
    }
};