import {Logger} from '@nestjs/common';
import {Match} from '../../domain/match';
import {Game} from '../../../game/domain/game';
import {GameStatusConstants} from '../../../game/domain/game-status.constants';
import {GameAlreadyFinishedException} from '../../../game/domain/exceptions/game-already-finished.exception';
import {GameId} from '../../../game/domain/game-id';
import {MatchId} from '../../domain/match-id';
import {MatchStatusConstants} from '../../domain/match-status.constants';
import {IMatchRepository} from '../../domain/i-match.repository';
import {SearchPlayersByGameApp} from '../../../player/application/search/by-game/search-players-by-game.app';
import {Player} from '../../../player/domain/player';
import {UpdatePlayerApp} from '../../../player/application/update/update-player.app';

export class CreateMatchApp {

    private readonly logger: Logger = new Logger(CreateMatchApp.name);

    constructor(
        private readonly searchPlayersByGameApp: SearchPlayersByGameApp,
        private readonly updatePlayerApp: UpdatePlayerApp,
        private readonly repository: IMatchRepository
    ) {
    }

    private static map(gameId: GameId, currentPlayers: number): Match {
        return Match.fromPrimitives({
            currentPosition: 1,
            gameId: gameId.toString(),
            matchId: MatchId.create().toString(),
            status: MatchStatusConstants.PLAYING,
            turn: 1,
            currentPlayers
        });
    }

    async exec(game: Game): Promise<Match> {
        this.logger.log(`[${this.exec.name}] INIT :: ${game.gameId.toString()}`);
        this.validateGame(game);
        const match: Match = CreateMatchApp.map(game.gameId, game.currentPlayers);
        const created: Match = await this.repository.create(match);
        await this.updatePlayers(created);
        this.logger.log(`[${this.exec.name}] FINISH ::`);
        return created;
    }

    private validateGame(game: Game): void {
        if (game.status.toString() !== GameStatusConstants.ACTIVE) throw new GameAlreadyFinishedException();
    }

    private async updatePlayers(match: Match): Promise<void> {
        const turns: Array<number> = match.createTurns();
        const players: Array<Player> = await this.searchPlayersByGameApp.exec(match.gameId);
        for (const player of players) {
            match.selectTurn(turns, player);
            await this.updatePlayerApp.exec(player);
            turns.splice(turns.indexOf(player.position), 1);
        }
    }
}