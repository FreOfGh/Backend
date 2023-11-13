import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {SearchPlayersByGameQuery} from './search-players-by-game.query';
import {PlayerDto} from '../../../domain/player.dto';
import {SearchPlayersByGameApp} from './search-players-by-game.app';
import {GameId} from '../../../../game/domain/game-id';
import {Player} from '../../../domain/player';

@QueryHandler(SearchPlayersByGameQuery)
export class SearchPlayersByGameQueryHandler implements IQueryHandler<SearchPlayersByGameQuery, Array<PlayerDto>> {

    constructor(private readonly app: SearchPlayersByGameApp) {
    }

    async execute(query: SearchPlayersByGameQuery): Promise<Array<PlayerDto>> {
        const found: Array<Player> = await this.app.exec(new GameId(query.gameId));
        return found.map(f => f.toPrimitives());
    }
}