import {Logger} from '@nestjs/common';
import {GameCode} from '../../../domain/game-code';
import {Game} from '../../../domain/game';
import {IGameRepository} from '../../../domain/i-game.repository';
import {GameNotFoundException} from '../../../domain/exceptions/game-not-found.exception';

export class SearchGameByCodeApp {

    private readonly logger: Logger = new Logger(SearchGameByCodeApp.name);

    constructor(private readonly repository: IGameRepository) {
    }

    async exec(code: GameCode, throwExceptionIfNotFound = true): Promise<Game> {
        this.logger.log(`[${this.exec.name}] INIT :: code: ${code.toString()}`);
        const found: Game = await this.repository.findByCode(code);
        if (throwExceptionIfNotFound && !found) throw new GameNotFoundException();
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return found;
    }
}