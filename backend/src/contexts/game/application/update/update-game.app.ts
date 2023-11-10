import {Logger} from '@nestjs/common';
import {IGameRepository} from '../../domain/i-game.repository';
import {Game} from '../../domain/game';
import {GameNotUpdatedException} from '../../domain/exceptions/game-not-updated.exception';

export class UpdateGameApp {

    private readonly logger: Logger = new Logger(UpdateGameApp.name);

    constructor(private readonly repository: IGameRepository) {
    }

    async exec(game: Game, throwExceptionIfCantUpdate: boolean = true): Promise<Game> {
        this.logger.log(`[${this.exec.name}] INIT :: game: ${game.gameId.toString()}`);
        const updated: Game = await this.repository.update(game);
        if (throwExceptionIfCantUpdate && !game) throw new GameNotUpdatedException();
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return updated;
    }
}