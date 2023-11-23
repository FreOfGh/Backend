import {Logger} from '@nestjs/common';
import {GameCode} from '../../domain/game-code';
import {UserId} from '../../../user/domain/user-id';
import {SearchPlayerByUserApp} from '../../../player/application/search/by-user/search-player-by-user.app';
import {SearchGameByCodeApp} from '../search/by-code/search-game-by-code.app';
import {Player} from '../../../player/domain/player';
import {Game} from '../../domain/game';
import {IPlayerRepository} from '../../../player/domain/i-player.repository';
import {UpdateGameApp} from '../update/update-game.app';
import {GameStatusConstants} from '../../domain/game-status.constants';
import {SearchPlayersByGameApp} from '../../../player/application/search/by-game/search-players-by-game.app';
import {GameSocket} from '../../../../apps/game/sockets/game.socket';
import {GameEventsConstants} from '../../domain/game-events.constants';
import {SearchUserByIdApp} from '../../../user/application/search/by-id/search-user-by-id.app';
import {User} from '../../../user/domain/user';
import {UpdateUserApp} from '../../../user/application/update/one/update-user.app';
import {UserStatus} from '../../../user/domain/user-status';
import {UserStatusConstants} from '../../../user/domain/user-status.constants';

export class LeaveGameApp {

    private readonly logger: Logger = new Logger(LeaveGameApp.name);

    constructor(
        private readonly searchPlayerByUserApp: SearchPlayerByUserApp,
        private readonly searchGameByCodeApp: SearchGameByCodeApp,
        private readonly updateGameApp: UpdateGameApp,
        private readonly playerRepository: IPlayerRepository,
        private readonly searchPlayersByGameApp: SearchPlayersByGameApp,
        private readonly gameSocket: GameSocket,
        private readonly searchUserByIdApp: SearchUserByIdApp,
        private readonly updateUserApp: UpdateUserApp,
    ) {
    }

    async exec(gameCode: GameCode, userId: UserId): Promise<void> {
        this.logger.log(`[${this.exec.name}] INIT :: gameCode: ${gameCode.toString()}, userId: ${userId.toString()}`);
        const player: Player = await this.searchPlayerByUserApp.exec(userId);
        await this.playerRepository.delete(player);
        const userLeaving: User = await this.searchUserByIdApp.exec(userId);
        userLeaving.status = new UserStatus(UserStatusConstants.ACTIVE);
        await this.updateUserApp.exec(userLeaving);
        const game: Game = await this.searchGameByCodeApp.exec(gameCode);
        game.removePlayer();
        await this.updateGameApp.exec(game);
        if (game.status.toString() == GameStatusConstants.FINISHED) {
            const winnerPlayer: Player = (await this.searchPlayersByGameApp.exec(game.gameId))[0];
            const user: User = await this.searchUserByIdApp.exec(winnerPlayer.userId);
            await this.playerRepository.delete(winnerPlayer);
            user.tokens += game.totalBet * game.requiredPlayers;
            user.status = new UserStatus(UserStatusConstants.ACTIVE);
            await this.updateUserApp.exec(user);
            this.gameSocket.wsServer.in(winnerPlayer.playerId.toString()).emit(GameEventsConstants.EVENT_WIN_GAME);
        }
        this.logger.log(`[${this.exec.name}] FINISH ::`);
    }
}