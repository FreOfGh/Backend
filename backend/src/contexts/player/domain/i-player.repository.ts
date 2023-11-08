import {UserId} from '../../user/domain/user-id';
import {Player} from './player';

export interface IPlayerRepository {

    findByUserId(userId: UserId): Promise<Player>;

    create(player: Player): Promise<Player>;
}