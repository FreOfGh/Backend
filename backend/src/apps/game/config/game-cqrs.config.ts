import {
    SearchPublicGamesQueryHandler
} from '../../../contexts/game/application/search/public/search-public-games.query-handler';
import {CreateGameCommandHandler} from '../../../contexts/game/application/create/create-game.command-handler';

const CommandHandlers = [CreateGameCommandHandler];

const QueryHandlers = [SearchPublicGamesQueryHandler];
export const GameCqrsConfig = [
    ...CommandHandlers,
    ...QueryHandlers,
];