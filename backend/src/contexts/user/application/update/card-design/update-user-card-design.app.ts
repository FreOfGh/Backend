import {Logger} from '@nestjs/common';
import {UserId} from '../../../domain/user-id';
import {CardDesignId} from '../../../../card-design/domain/card-design-id';
import {User} from '../../../domain/user';
import {SearchCardDesignByIdApp} from '../../../../card-design/application/search/by-id/search-card-design-by-id.app';
import {SearchUserByIdApp} from '../../search/by-id/search-user-by-id.app';
import {UpdateUserApp} from '../one/update-user.app';
import {CardDesign} from '../../../../card-design/domain/card-design';

export class UpdateUserCardDesignApp {

    private readonly logger: Logger = new Logger(UpdateUserCardDesignApp.name);

    constructor(
        private readonly searchUserByIdApp: SearchUserByIdApp,
        private readonly searchCardDesignByIdApp: SearchCardDesignByIdApp,
        private readonly updateUserApp: UpdateUserApp,
    ) {
    }

    async exec(userId: UserId, cardDesignId: CardDesignId): Promise<User> {
        this.logger.log(`[${this.exec.name}] INIT :: userId: ${userId.toString()}, cardDesignId: ${cardDesignId.toString()}`);
        const user: User = await this.searchUserByIdApp.exec(userId);
        const design: CardDesign = await this.searchCardDesignByIdApp.exec(cardDesignId);
        user.setCardDesign(design);
        const updated: User = await this.updateUserApp.exec(user);
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return updated;
    }
}