import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {SearchPlayerByUserQuery} from './search-player-by-user.query';
import {PlayerDto} from '../../../domain/player.dto';
import {SearchPlayerByUserApp} from './search-player-by-user.app';
import {Player} from '../../../domain/player';
import {UserId} from '../../../../user/domain/user-id';

@QueryHandler(SearchPlayerByUserQuery)
export class SearchPlayerByUserQueryHandler implements IQueryHandler<SearchPlayerByUserQuery, PlayerDto> {

    constructor(private readonly app: SearchPlayerByUserApp) {
    }

    async execute(query: SearchPlayerByUserQuery): Promise<PlayerDto> {
        const player: Player = await this.app.exec(new UserId(query.userId));
        return player.toPrimitives();
    }
}