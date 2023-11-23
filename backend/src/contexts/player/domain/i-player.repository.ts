import {UserId} from '../../user/domain/user-id';
import {Player} from './player';
import {GameId} from '../../game/domain/game-id';

export interface IPlayerRepository {

    findByGame(gameId: GameId): Promise<Array<Player>>;

    findByUserId(userId: UserId): Promise<Player>;

    findByPosition(gameId: GameId, position: number): Promise<Player>;

    create(player: Player): Promise<Player>;

    update(player: Player): Promise<Player>;

    delete(player: Player): Promise<void>;
}