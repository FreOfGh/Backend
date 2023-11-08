import {Module} from '@nestjs/common';
import {SharedModule} from '../shared/shared.module';
import {
    CardDesignDocumentProvider
} from '../../contexts/card-design/infrastructure/mongodb/card-design-document.provider';
import {
    MongoCardDesignRepositoryProvider
} from '../../contexts/card-design/infrastructure/mongodb/mongo-card-design.repository.provider';
import {CardDesignCqrsConfig} from './config/card-design-cqrs.config';
import {
    SearchDefaultDesignAppProvider
} from '../../contexts/card-design/application/search/default/search-default-design.app.provider';

@Module({
    imports: [SharedModule],
    providers: [
        CardDesignDocumentProvider,
        MongoCardDesignRepositoryProvider,
        ...CardDesignCqrsConfig,
        SearchDefaultDesignAppProvider,
    ],
    exports: [SearchDefaultDesignAppProvider]
})
export class CardDesignModule {
}