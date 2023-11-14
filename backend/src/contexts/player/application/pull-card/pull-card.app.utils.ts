import {Player} from '../../domain/player';
import {PlayerStatusConstants} from '../../domain/player-status.constants';
import {PlayerNotInTurnException} from '../../domain/exceptions/player-not-in-turn.exception';
import {PlayerCanNotPullCardException} from '../../domain/exceptions/player-can-not-pull-card.exception';
import {DiscardedCardsAreEmptyException} from '../../../card/domain/exceptions/discarded-cards-are-empty.exception';
import {Match} from '../../../match/domain/match';

export class PullCardAppUtils {

    static validatePlayer(player: Player): void {
        if (player.status.toString() !== PlayerStatusConstants.IN_TURN) throw new PlayerNotInTurnException();
        if (player.sobrante) throw new PlayerCanNotPullCardException();
    }

    static validateDiscardedCards(match: Match): void {
        if (match.discardedCards.length === 0) throw new DiscardedCardsAreEmptyException();
    }
}