import {Logger} from '@nestjs/common';
import {Player} from '../../domain/player';
import {UserId} from '../../../user/domain/user-id';
import {SearchPlayerByUserApp} from '../search/by-user/search-player-by-user.app';
import {PlayerStatusConstants} from '../../domain/player-status.constants';
import {PlayerNotInTurnException} from '../../domain/exceptions/player-not-in-turn.exception';
import {PlayerNotPulledCardException} from '../../domain/exceptions/player-not-pulled-card.exception';
import {SearchActiveMatchApp} from '../../../match/application/search/active/search-active-match.app';
import {Match} from '../../../match/domain/match';
import {UpdateMatchApp} from '../../../match/application/update/update-match.app';
import {UpdatePlayerApp} from '../update/update-player.app';
import {GameId} from '../../../game/domain/game-id';
import {PlayerStatus} from '../../domain/player-status';
import {SearchPlayerByPositionApp} from '../search/by-position/search-player-by-position.app';
import {GameSocket} from '../../../../apps/game/sockets/game.socket';
import {GameEventsConstants} from '../../../game/domain/game-events.constants';

export class ThrowCardApp {

    private readonly logger: Logger = new Logger(ThrowCardApp.name);

    constructor(
        private readonly searchPlayerByUserApp: SearchPlayerByUserApp,
        private readonly searchActiveMatchApp: SearchActiveMatchApp,
        private readonly updateMatchApp: UpdateMatchApp,
        private readonly updatePlayerApp: UpdatePlayerApp,
        private readonly searchPlayerByPosition: SearchPlayerByPositionApp,
        private readonly socket: GameSocket,
    ) {
    }

    async exec(userId: UserId): Promise<void> {
        this.logger.log(`[${this.exec.name}] INIT :: userId: ${userId.toString()}`);
        const player: Player = await this.searchPlayerByUserApp.exec(userId);
        this.validatePlayer(player);
        const match: Match = await this.updateMatch(player);
        await this.updatePlayer(player);
        await this.notifyNextPlayer(match, player.gameId, player.position);
        this.logger.log(`[${this.exec.name}] FINISH ::`);
    }

    private validatePlayer(player: Player): void {
        if (player.status.toString() !== PlayerStatusConstants.IN_TURN) throw new PlayerNotInTurnException();
        if (!player.sobrante) throw new PlayerNotPulledCardException();
    }

    private async updateMatch(player: Player): Promise<Match> {
        const match: Match = await this.searchActiveMatchApp.exec(player.gameId);
        match.discardedCards.push(player.sobrante);
        match.turn++;
        return this.updateMatchApp.exec(match);
    }

    private async updatePlayer(player: Player): Promise<Player> {
        player.sobrante = null;
        player.status = new PlayerStatus(PlayerStatusConstants.WAITING_TURN);
        return this.updatePlayerApp.exec(player);
    }

    private async notifyNextPlayer(match: Match, gameId: GameId, currentTurn: number): Promise<void> {
        const position: number = match.currentPlayers === currentTurn ? 1 : currentTurn + 1;
        const nextPlayer: Player = await this.searchPlayerByPosition.exec(gameId, position);
        nextPlayer.status = new PlayerStatus(PlayerStatusConstants.IN_TURN);
        await this.updatePlayerApp.exec(nextPlayer);
        this.socket.wsServer
            .in(gameId.toString())
            .emit(GameEventsConstants.EVENT_CHANGE_TURN, nextPlayer.toPrimitives());
        this.socket.wsServer
            .in(nextPlayer.playerId.toString())
            .emit(GameEventsConstants.EVENT_START_TURN);
    }
}