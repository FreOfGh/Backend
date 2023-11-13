import {PlayerId} from './player-id';
import {UserId} from '../../user/domain/user-id';
import {GameId} from '../../game/domain/game-id';
import {PlayerStatus} from './player-status';
import {Card} from '../../card/domain/card';
import {PlayerDto} from './player.dto';

export class Player {

    public position: number;
    public readonly playerId: PlayerId;
    public status: PlayerStatus;
    private readonly gameId: GameId;
    private readonly userId: UserId;
    private readonly score: number;
    private readonly terna1?: Array<Card>;
    private readonly terna2?: Array<Card>;
    private readonly cuarta?: Array<Card>;
    private readonly sobrante?: Card;

    constructor(
        playerId: PlayerId,
        gameId: GameId,
        userId: UserId,
        position: number,
        status: PlayerStatus,
        score: number,
        terna1: Array<Card>,
        terna2: Array<Card>,
        cuarta: Array<Card>,
        sobrante: Card,
    ) {
        this.playerId = playerId;
        this.gameId = gameId;
        this.userId = userId;
        this.position = position;
        this.status = status;
        this.score = score;
        this.terna1 = terna1;
        this.terna2 = terna2;
        this.cuarta = cuarta;
        this.sobrante = sobrante;
    }

    public static fromPrimitives(payload: PlayerDto): Player {
        return new Player(
            new PlayerId(payload.playerId),
            new GameId(payload.gameId),
            new UserId(payload.userId),
            payload.position,
            new PlayerStatus(payload.status),
            payload.score,
            Array.isArray(payload.terna1) ? payload.terna1.map(Card.fromPrimitives) : undefined,
            Array.isArray(payload.terna2) ? payload.terna2.map(Card.fromPrimitives) : undefined,
            Array.isArray(payload.cuarta) ? payload.cuarta.map(Card.fromPrimitives) : undefined,
            payload.sobrante ? Card.fromPrimitives(payload.sobrante) : undefined,
        );
    }

    public toPrimitives(): PlayerDto {
        return {
            cuarta: Array.isArray(this.cuarta) ? this.cuarta.map(c => c.toPrimitives()) : undefined,
            gameId: this.gameId.toString(),
            playerId: this.playerId.toString(),
            position: this.position,
            score: this.score,
            sobrante: this.sobrante?.toPrimitives(),
            status: this.status.toString(),
            terna1: Array.isArray(this.terna1) ? this.terna1.map(c => c.toPrimitives()) : undefined,
            terna2: Array.isArray(this.terna2) ? this.terna2.map(c => c.toPrimitives()) : undefined,
            userId: this.userId.toString()

        };
    }
}