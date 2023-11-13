import {GameId} from '../../../../game/domain/game-id';
import {Player} from '../../../domain/player';
import {IPlayerRepository} from '../../../domain/i-player.repository';

export class SearchPlayersByGameApp {

    constructor(private readonly repository: IPlayerRepository) {
    }

    async exec(gameId: GameId): Promise<Array<Player>> {
        return this.repository.findByGame(gameId);
    }
}