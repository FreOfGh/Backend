import {Logger} from '@nestjs/common';
import {UserId} from '../../../user/domain/user-id';
import {Game} from '../../domain/game';
import {GameCode} from '../../domain/game-code';
import {SearchGameByCodeApp} from '../search/by-code/search-game-by-code.app';
import {SearchUserByIdApp} from '../../../user/application/search/by-id/search-user-by-id.app';
import {User} from '../../../user/domain/user';
import {GameStatusConstants} from '../../domain/game-status.constants';
import {GameAlreadyStartedException} from '../../domain/exceptions/game-already-started.exception';
import {NotEnoughTokensException} from '../../../user/domain/exceptions/not-enough-tokens.exception';
import {UserStatusConstants} from '../../../user/domain/user-status.constants';
import {UserIsAlreadyPlayingException} from '../../../user/domain/exceptions/user-is-already-playing.exception';
import {UserStatus} from '../../../user/domain/user-status';
import {UpdateUserApp} from '../../../user/application/update/one/update-user.app';
import {CreatePlayerApp} from '../../../player/application/create/create-player.app';
import {UpdateGameApp} from '../update/update-game.app';

export class JoinGameApp {

    private readonly logger: Logger = new Logger(JoinGameApp.name);

    constructor(
        private readonly searchGameByCodeApp: SearchGameByCodeApp,
        private readonly searchUserByIdApp: SearchUserByIdApp,
        private readonly updateUserApp: UpdateUserApp,
        private readonly createPlayerApp: CreatePlayerApp,
        private readonly updateGameApp: UpdateGameApp,
    ) {
    }

    async exec(userId: UserId, code: GameCode): Promise<Game> {
        this.logger.log(`[${this.exec.name}] INIT :: userId: ${userId.toString()} gameId: ${code.toString()}`);
        const game: Game = await this.searchGameByCodeApp.exec(code);
        this.validateGame(game);
        const user: User = await this.searchUserByIdApp.exec(userId);
        this.validateUser(game, user);
        await this.updateUser(game, user);
        await this.createPlayerApp.exec(userId, game.gameId);
        const updated: Game = await this.updateGame(game);
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return updated;
    }

    private validateGame(game: Game): void {
        if (
            game.status.toString() !== GameStatusConstants.WAITING_PLAYERS ||
            game.requiredPlayers == game.totalPlayers
        ) throw new GameAlreadyStartedException();
    }

    private validateUser(game: Game, user: User): void {
        if (game.totalBet > user.getTokens()) throw new NotEnoughTokensException();
        if (user.status.toString() === UserStatusConstants.PLAYING) throw new UserIsAlreadyPlayingException();
    }

    private async updateGame(game: Game): Promise<Game> {
        game.addPlayer();
        return this.updateGameApp.exec(game);
    }

    private async updateUser(game: Game, user: User): Promise<void> {
        user.removeTokens(game.totalBet);
        user.status = new UserStatus(UserStatusConstants.PLAYING);
        await this.updateUserApp.exec(user);
    }

}