import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {SearchActiveMatchByUserQuery} from './search-active-match-by-user.query';
import {MatchDto} from '../../../../domain/match.dto';
import {SearchActiveMatchByUserApp} from './search-active-match-by-user.app';
import {UserId} from '../../../../../user/domain/user-id';
import {Match} from '../../../../domain/match';

@QueryHandler(SearchActiveMatchByUserQuery)
export class SearchActiveMatchByUserQueryHandler implements IQueryHandler<SearchActiveMatchByUserQuery, MatchDto> {

    constructor(private readonly app: SearchActiveMatchByUserApp) {
    }

    async execute(query: SearchActiveMatchByUserQuery): Promise<MatchDto> {
        const match: Match = await this.app.exec(new UserId(query.userId));
        return match.toPrimitives();
    }
}