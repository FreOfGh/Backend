import {Logger} from '@nestjs/common';
import {Player} from '../../domain/player';
import {UserId} from '../../../user/domain/user-id';
import {GameId} from '../../../game/domain/game-id';
import {SearchPlayerByUserApp} from '../search/by-user/search-player-by-user.app';
import {IPlayerRepository} from '../../domain/i-player.repository';
import {UserIsAlreadyPlayingException} from '../../../user/domain/exceptions/user-is-already-playing.exception';
import {PlayerId} from '../../domain/player-id';
import {PlayerStatusConstants} from '../../domain/player-status.constants';

export class CreatePlayerApp {

    private readonly logger: Logger = new Logger(CreatePlayerApp.name);

    constructor(
        private readonly searchPlayerByUserApp: SearchPlayerByUserApp,
        private readonly repository: IPlayerRepository,
    ) {
    }

    private static map(
        userId: UserId,
        username: string,
        userIcon: string,
        userDesign: string,
        gameId: GameId
    ): Player {
        return Player.fromPrimitives({
            gameId: gameId.toString(),
            playerId: PlayerId.create().toString(),
            position: 0,
            score: 0,
            status: PlayerStatusConstants.WAITING_GAME,
            userId: userId.toString(),
            username,
            userIcon,
            userDesign,
            terna1: [],
            terna2: [],
            cuarta: [],
        });
    }

    async exec(
        userId: UserId,
        username: string,
        userIcon: string,
        userDesign: string,
        gameId: GameId
    ): Promise<Player> {
        this.logger.log(`[${this.exec.name}] INIT ::`);
        await this.validateIfUserIsPlaying(userId);
        const player: Player = CreatePlayerApp.map(userId, username, userIcon, userDesign, gameId);
        const created: Player = await this.repository.create(player);
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return created;
    }

    private async validateIfUserIsPlaying(userId: UserId): Promise<void> {
        const currentPlayer: Player = await this.searchPlayerByUserApp.exec(userId, false);
        if (currentPlayer) throw new UserIsAlreadyPlayingException();
    }
}