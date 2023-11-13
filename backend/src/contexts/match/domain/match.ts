import {GameId} from '../../game/domain/game-id';
import {MatchId} from './match-id';
import {MatchStatus} from './match-status';
import {MatchDto} from './match.dto';
import {Player} from '../../player/domain/player';
import {PlayerStatus} from '../../player/domain/player-status';
import {PlayerStatusConstants} from '../../player/domain/player-status.constants';

export class Match {

    public readonly gameId: GameId;
    private readonly matchId: MatchId;
    private readonly currentPosition: number;
    private readonly currentPlayers: number;
    private readonly turn: number;
    private readonly status: MatchStatus;


    constructor(
        gameId: GameId,
        matchId: MatchId,
        currentPosition: number,
        currentPlayers: number,
        turn: number,
        status: MatchStatus,
    ) {
        this.gameId = gameId;
        this.matchId = matchId;
        this.currentPosition = currentPosition;
        this.currentPlayers = currentPlayers;
        this.turn = turn;
        this.status = status;
    }

    public static fromPrimitives(payload: MatchDto): Match {
        return new Match(
            new GameId(payload.gameId),
            new MatchId(payload.matchId),
            payload.currentPosition,
            payload.currentPlayers,
            payload.turn,
            new MatchStatus(payload.status),
        );
    }

    public createTurns(): Array<number> {
        return Array.from({length: this.currentPlayers}, (_, i) => i + 1);
    }

    public selectTurn(turns: Array<number>, player: Player): void {
        const random: number = Math.floor(Math.random() * turns.length);
        player.position = turns[random];
        if (player.position == 1) player.status = new PlayerStatus(PlayerStatusConstants.IN_TURN);
        else player.status = new PlayerStatus(PlayerStatusConstants.WAITING_TURN);
    }

    public toPrimitives(): MatchDto {
        return {
            currentPosition: this.currentPosition,
            currentPlayers: this.currentPlayers,
            gameId: this.gameId.toString(),
            matchId: this.matchId.toString(),
            status: this.status.toString(),
            turn: this.turn,
        };
    }
}