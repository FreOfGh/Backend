import {Match} from './match';
import {GameId} from '../../game/domain/game-id';

export interface IMatchRepository {

    create(match: Match): Promise<Match>;

    update(match: Match): Promise<Match>;

    findActive(gameId: GameId): Promise<Match>;
}