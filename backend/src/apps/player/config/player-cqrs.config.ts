import {
    SearchPlayerByUserQueryHandler
} from '../../../contexts/player/application/search/by-user/search-player-by-user.query-handler';
import {
    SearchPlayersByGameQueryHandler
} from '../../../contexts/player/application/search/by-game/search-players-by-game.query-handler';
import {ThrowCardCommandHandler} from '../../../contexts/player/application/throw-card/throw-card.command-handler';
import {
    PullCardFromDeckCommandHandler
} from '../../../contexts/player/application/pull-card/from-deck/pull-card-from-deck.command-handler';

const QueryHandlers = [
    SearchPlayerByUserQueryHandler,
    SearchPlayersByGameQueryHandler,
];

const CommandHandlers = [
    ThrowCardCommandHandler,
    PullCardFromDeckCommandHandler,
];

export const PlayerCqrsConfig = [
    ...QueryHandlers,
    ...CommandHandlers,
];