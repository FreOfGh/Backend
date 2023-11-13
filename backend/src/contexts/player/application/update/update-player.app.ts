import {Logger} from '@nestjs/common';
import {IPlayerRepository} from '../../domain/i-player.repository';
import {Player} from '../../domain/player';
import {PlayerNotUpdatedException} from '../../domain/exceptions/player-not-updated.exception';

export class UpdatePlayerApp {

    private readonly logger: Logger = new Logger(UpdatePlayerApp.name);

    constructor(private readonly repository: IPlayerRepository) {
    }

    async exec(player: Player, throwExceptionIfCantUpdate: boolean = true): Promise<Player> {
        this.logger.log(`[${this.exec.name}] INIT :: playerId: ${player.playerId.toString()}`);
        const updated: Player = await this.repository.update(player);
        if (throwExceptionIfCantUpdate && !player) throw new PlayerNotUpdatedException();
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return updated;
    }
}