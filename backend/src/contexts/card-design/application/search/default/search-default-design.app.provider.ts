import {FactoryProvider} from '@nestjs/common';
import {SearchDefaultCardDesignApp} from './search-default-card-design.app';
import {MongoCardDesignRepository} from '../../../infrastructure/mongodb/mongo-card-design.repository';
import {ICardDesignRepository} from '../../../domain/i-card-design.repository';

export const SearchDefaultDesignAppProvider: FactoryProvider<SearchDefaultCardDesignApp> = {
    inject: [MongoCardDesignRepository],
    provide: SearchDefaultCardDesignApp,
    useFactory(repository: ICardDesignRepository): SearchDefaultCardDesignApp {
        return new SearchDefaultCardDesignApp(repository);
    }
};