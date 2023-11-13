import {Logger} from '@nestjs/common';
import {GameId} from '../../../../game/domain/game-id';
import {Player} from '../../../domain/player';
import {IPlayerRepository} from '../../../domain/i-player.repository';

export class SearchPlayersByGameApp {

    private readonly logger: Logger = new Logger(SearchPlayersByGameApp.name);

    constructor(private readonly repository: IPlayerRepository) {
    }

    async exec(gameId: GameId): Promise<Array<Player>> {
        return this.repository.findByGame(gameId);
    }
}