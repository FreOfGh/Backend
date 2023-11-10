import {
    SearchPublicGamesQueryHandler
} from '../../../contexts/game/application/search/public/search-public-games.query-handler';
import {CreateGameCommandHandler} from '../../../contexts/game/application/create/create-game.command-handler';
import {JoinGameCommandHandler} from '../../../contexts/game/application/join/join-game.command-handler';
import {JoinGameRoomCommandHandler} from '../../../contexts/game/application/join/room/join-game-room.command-handler';

const CommandHandlers = [
    CreateGameCommandHandler,
    JoinGameCommandHandler,
    JoinGameRoomCommandHandler,
];

const QueryHandlers = [SearchPublicGamesQueryHandler];
export const GameCqrsConfig = [
    ...CommandHandlers,
    ...QueryHandlers,
];