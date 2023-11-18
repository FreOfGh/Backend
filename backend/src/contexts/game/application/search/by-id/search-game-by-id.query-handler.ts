import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {SearchGameByIdQuery} from './search-game-by-id.query';
import {GameDto} from '../../../domain/game.dto';
import {SearchGameByIdApp} from './search-game-by-id.app';
import {Game} from '../../../domain/game';
import {GameId} from '../../../domain/game-id';

@QueryHandler(SearchGameByIdQuery)
export class SearchGameByIdQueryHandler implements IQueryHandler<SearchGameByIdQuery, GameDto> {


    constructor(private readonly app: SearchGameByIdApp) {
    }

    async execute(query: SearchGameByIdQuery): Promise<GameDto> {
        const game: Game = await this.app.exec(new GameId(query.gameId));
        return game.toPrimitives();
    }
}