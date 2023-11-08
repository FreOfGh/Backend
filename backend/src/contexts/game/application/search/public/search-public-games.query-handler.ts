import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {SearchPublicGamesQuery} from './search-public-games.query';
import {Game} from '../../../domain/game';
import {SearchPublicGamesApp} from './search-public-games.app';
import {GameDto} from '../../../domain/game.dto';
import {Logger} from '@nestjs/common';

@QueryHandler(SearchPublicGamesQuery)
export class SearchPublicGamesQueryHandler implements IQueryHandler<SearchPublicGamesQuery, Array<GameDto>> {

    private readonly logger: Logger = new Logger(SearchPublicGamesQueryHandler.name);

    constructor(private readonly app: SearchPublicGamesApp) {
    }

    async execute(query: SearchPublicGamesQuery): Promise<Array<GameDto>> {
        this.logger.log(`[${this.execute.name}] EXECUTING Query :: ${JSON.stringify(query)}`);
        const gamesFound: Array<Game> = await this.app.exec();
        return gamesFound.map(g => g.toPrimitives());
    }
}