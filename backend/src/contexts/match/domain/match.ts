import {GameId} from '../../game/domain/game-id';
import {MatchId} from './match-id';
import {MatchStatus} from './match-status';
import {MatchDto} from './match.dto';

export class Match {

    private readonly gameId: GameId;
    private readonly matchId: MatchId;
    private readonly currentPosition: number;
    private readonly status: MatchStatus;


    constructor(
        gameId: GameId,
        matchId: MatchId,
        currentPosition: number,
        status: MatchStatus,
    ) {
        this.gameId = gameId;
        this.matchId = matchId;
        this.currentPosition = currentPosition;
        this.status = status;
    }

    public static fromPrimitives(payload: MatchDto): Match {
        return new Match(
            new GameId(payload.gameId),
            new MatchId(payload.matchId),
            payload.currentPosition,
            new MatchStatus(payload.status),
        );
    }

    public toPrimitives(): MatchDto {
        return {
            currentPosition: this.currentPosition,
            gameId: this.gameId.toString(),
            matchId: this.matchId.toString(),
            status: this.status.toString(),
        };
    }
}