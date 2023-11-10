import {Logger} from '@nestjs/common';
import {GameId} from '../../../domain/game-id';
import {Game} from '../../../domain/game';
import {IGameRepository} from '../../../domain/i-game.repository';
import {GameNotFoundException} from '../../../domain/exceptions/game-not-found.exception';

export class SearchGameByIdApp {

    private readonly logger: Logger = new Logger(SearchGameByIdApp.name);

    constructor(private readonly repository: IGameRepository) {
    }

    async exec(gameId: GameId, throwExceptionIfNotExist = true): Promise<Game> {
        this.logger.log(`[${this.exec.name}] INIT :: gameId: ${gameId.toString()}`);
        const game: Game = await this.repository.findById(gameId);
        if (throwExceptionIfNotExist && !game) throw new GameNotFoundException();
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return game;
    }
}