import {Logger} from '@nestjs/common';
import {Player} from '../../../domain/player';
import {UserId} from '../../../../user/domain/user-id';
import {IPlayerRepository} from '../../../domain/i-player.repository';
import {PlayerNotFoundException} from '../../../domain/exceptions/player-not-found.exception';

export class SearchPlayerByUserApp {

    private readonly logger: Logger = new Logger(SearchPlayerByUserApp.name);

    constructor(private readonly repository: IPlayerRepository) {
    }

    async exec(userId: UserId, throwIfUserNotFound = true): Promise<Player> {
        this.logger.log(`[${this.exec.name}] INIT :: userId: ${userId.toString()}`);
        const player: Player = await this.repository.findByUserId(userId);
        if (throwIfUserNotFound && !player) throw new PlayerNotFoundException();
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return player;
    }
}