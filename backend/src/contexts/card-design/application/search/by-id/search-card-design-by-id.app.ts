import {Logger} from '@nestjs/common';
import {ICardDesignRepository} from '../../../domain/i-card-design.repository';
import {CardDesignId} from '../../../domain/card-design-id';
import {CardDesign} from '../../../domain/card-design';
import {CardDesignNotFoundException} from '../../../domain/exceptions/card-design-not-found.exception';

export class SearchCardDesignByIdApp {

    private readonly logger: Logger = new Logger(SearchCardDesignByIdApp.name);

    constructor(private readonly repository: ICardDesignRepository) {
    }

    async exec(cardDesignId: CardDesignId, throwExceptionIfNotFound = true): Promise<CardDesign> {
        this.logger.log(`[${this.exec.name}] INIT :: cardDesignId: ${cardDesignId.toString()}`);
        const cardDesign = await this.repository.findById(cardDesignId);
        if (throwExceptionIfNotFound && !cardDesign) throw new CardDesignNotFoundException();
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return cardDesign;
    }
}