import {
    SearchPlayerByUserQueryHandler
} from '../../../contexts/player/application/search/by-user/search-player-by-user.query-handler';
import {
    SearchPlayersByGameQueryHandler
} from '../../../contexts/player/application/search/by-game/search-players-by-game.query-handler';

const QueryHandlers = [
    SearchPlayerByUserQueryHandler,
    SearchPlayersByGameQueryHandler,
];

export const PlayerCqrsConfig = [
    ...QueryHandlers,
];