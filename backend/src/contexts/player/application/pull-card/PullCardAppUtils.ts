import {Player} from '../../domain/player';
import {PlayerStatusConstants} from '../../domain/player-status.constants';
import {PlayerNotInTurnException} from '../../domain/exceptions/player-not-in-turn.exception';
import {PlayerCanNotPullCardException} from '../../domain/exceptions/player-can-not-pull-card.exception';

export class PullCardAppUtils {

    static validatePlayer(player: Player): void {
        if (player.status.toString() !== PlayerStatusConstants.IN_TURN) throw new PlayerNotInTurnException();
        if (player.sobrante) throw new PlayerCanNotPullCardException();
    }
}