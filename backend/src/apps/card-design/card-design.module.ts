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
import {
    SearchActiveCardDesignsAppProvider
} from '../../contexts/card-design/application/search/active/search-active-card-designs.app.provider';
import {SearchActiveCardDesignsController} from './controllers/search/active/search-active-card-designs.controller';
import {
    SearchCardDesignByIdAppProvider
} from '../../contexts/card-design/application/search/by-id/search-card-design-by-id.app.provider';

@Module({
    imports: [SharedModule],
    controllers: [SearchActiveCardDesignsController],
    providers: [
        CardDesignDocumentProvider,
        MongoCardDesignRepositoryProvider,
        ...CardDesignCqrsConfig,
        SearchCardDesignByIdAppProvider,
        SearchDefaultDesignAppProvider,
        SearchActiveCardDesignsAppProvider,
    ],
    exports: [
        SearchCardDesignByIdAppProvider,
        SearchDefaultDesignAppProvider,
    ]
})
export class CardDesignModule {
}