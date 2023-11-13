import {UserId} from '../../user/domain/user-id';
import {Player} from './player';
import {GameId} from '../../game/domain/game-id';

export interface IPlayerRepository {

    findByGame(gameId: GameId): Promise<Array<Player>>;

    findByUserId(userId: UserId): Promise<Player>;

    create(player: Player): Promise<Player>;
}