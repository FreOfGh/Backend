import {Logger} from '@nestjs/common';
import {GameId} from '../../../../game/domain/game-id';
import {IPlayerRepository} from '../../../domain/i-player.repository';
import {Player} from '../../../domain/player';
import {PlayerNotFoundException} from '../../../domain/exceptions/player-not-found.exception';

export class SearchStartPlayerApp {

    private readonly logger: Logger = new Logger(SearchStartPlayerApp.name);

    constructor(private readonly repository: IPlayerRepository) {
    }

    async exec(gameId: GameId, throwExceptionIfNotFound = true): Promise<Player> {
        this.logger.log(`[${this.exec.name}] INIT :: gameId: ${gameId.toString()}`);
        const player: Player = await this.repository.findStartPlayer(gameId);
        if (throwExceptionIfNotFound && !player) throw new PlayerNotFoundException();
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return player;
    }
}