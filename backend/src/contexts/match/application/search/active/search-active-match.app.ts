import {IMatchRepository} from '../../../domain/i-match.repository';
import {GameId} from '../../../../game/domain/game-id';
import {Match} from '../../../domain/match';

export class SearchActiveMatchApp {

    constructor(private readonly repository: IMatchRepository) {
    }

    exec(gameId: GameId): Promise<Match> {
        return this.repository.findActive(gameId);
    }
}