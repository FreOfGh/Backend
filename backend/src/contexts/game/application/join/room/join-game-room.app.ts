import {Logger} from '@nestjs/common';
import {GameId} from '../../../domain/game-id';
import {SearchGameByIdApp} from '../../search/by-id/search-game-by-id.app';
import {Game} from '../../../domain/game';
import {GameSocket} from '../../../../../apps/game/sockets/game.socket';
import {GameEventsConstants} from '../../../domain/game-events.constants';
import {UpdateGameApp} from '../../update/update-game.app';
import {GameStatusConstants} from '../../../domain/game-status.constants';
import {GameStatus} from '../../../domain/game-status';
import {GameAlreadyStartedException} from '../../../domain/exceptions/game-already-started.exception';
import {SearchPlayersByGameApp} from '../../../../player/application/search/by-game/search-players-by-game.app';
import {Player} from '../../../../player/domain/player';

export class JoinGameRoomApp {

    private readonly logger: Logger = new Logger(JoinGameRoomApp.name);

    constructor(
        private readonly searchGameByIdApp: SearchGameByIdApp,
        private readonly updateGameApp: UpdateGameApp,
        private readonly searchPlayersByGameApp: SearchPlayersByGameApp,
        private readonly socket: GameSocket,
    ) {
    }

    public async exec(gameId: GameId): Promise<void> {
        this.logger.log(`[${this.exec.name}] INIT :: gameId: ${gameId.toString()}`);
        const game: Game = await this.searchGameByIdApp.exec(gameId);
        if (game.status.toString() !== GameStatusConstants.WAITING_PLAYERS) throw new GameAlreadyStartedException();
        if (game.requiredPlayers === game.totalPlayers) {
            const startPlayer: Player = await this.updatePlayers(gameId, game.requiredPlayers);
            this.socket.wsServer
                .in(gameId.toString())
                .emit(GameEventsConstants.EVENT_START_GAME, {start: true});
            game.status = new GameStatus(GameStatusConstants.ACTIVE);
            await this.updateGameApp.exec(game);
        }
        this.logger.log(`[${this.exec.name}] FINISH ::`);
    }

    private async updatePlayers(gameId: GameId, requiredPlayers: number): Promise<Player> {
        const allowed: Array<number> = Array.from({length: requiredPlayers}, (_, i) => i + 1);
        const players: Array<Player> = await this.searchPlayersByGameApp.exec(gameId);
        for (const player in players) {

        }
        return;
    }
}