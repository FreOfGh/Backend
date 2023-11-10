import {
    SearchPlayerByUserQueryHandler
} from '../../../contexts/player/application/search/by-user/search-player-by-user.query-handler';

const QueryHandlers = [
    SearchPlayerByUserQueryHandler
];

export const PlayerCqrsConfig = [
    ...QueryHandlers,
];