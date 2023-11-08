import {FactoryProvider} from '@nestjs/common';
import {UpdateUserCardDesignApp} from './update-user-card-design.app';
import {SearchUserByIdApp} from '../../search/by-id/search-user-by-id.app';
import {SearchCardDesignByIdApp} from '../../../../card-design/application/search/by-id/search-card-design-by-id.app';
import {UpdateUserApp} from '../one/update-user.app';

export const UpdateUserCardDesignAppProvider: FactoryProvider<UpdateUserCardDesignApp> = {
    inject: [
        SearchUserByIdApp,
        SearchCardDesignByIdApp,
        UpdateUserApp,
    ],
    provide: UpdateUserCardDesignApp,
    useFactory(
        searchUserByIdApp: SearchUserByIdApp,
        searchCardDesignByIdApp: SearchCardDesignByIdApp,
        updateUserApp: UpdateUserApp,
    ): UpdateUserCardDesignApp {
        return new UpdateUserCardDesignApp(
            searchUserByIdApp,
            searchCardDesignByIdApp,
            updateUserApp,
        );
    }
};