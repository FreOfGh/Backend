import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {SearchActiveCardDesignsQuery} from './search-active-card-designs.query';
import {CardDesignDto} from '../../../domain/card-design.dto';
import {SearchActiveCardDesignsApp} from './search-active-card-designs.app';
import {CardDesign} from '../../../domain/card-design';
import {Logger} from '@nestjs/common';

@QueryHandler(SearchActiveCardDesignsQuery)
export class SearchActiveCardDesignsQueryHandler implements IQueryHandler<SearchActiveCardDesignsQuery, Array<CardDesignDto>> {

    private readonly logger: Logger = new Logger(SearchActiveCardDesignsQueryHandler.name);

    constructor(private readonly app: SearchActiveCardDesignsApp) {
    }

    async execute(query: SearchActiveCardDesignsQuery): Promise<Array<CardDesignDto>> {
        this.logger.log(`[${this.execute.name}] Executing Query :: ${JSON.stringify(query)}`);
        const found: Array<CardDesign> = await this.app.exec();
        return found.map(cD => cD.toPrimitives());
    }
}