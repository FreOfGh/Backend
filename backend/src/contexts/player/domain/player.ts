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
    public readonly terna1: Array<Card>;
    public readonly terna2: Array<Card>;
    public readonly cuarta: Array<Card>;
    public sobrante?: Card;
    public readonly gameId: GameId;
    private readonly userId: UserId;
    private readonly score: number;

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
            payload.terna1.map(Card.fromPrimitives),
            payload.terna2.map(Card.fromPrimitives),
            payload.cuarta.map(Card.fromPrimitives),
            payload.sobrante ? Card.fromPrimitives(payload.sobrante) : undefined,
        );
    }

    public toPrimitives(): PlayerDto {
        return {
            cuarta: this.cuarta.map(c => c.toPrimitives()),
            gameId: this.gameId.toString(),
            playerId: this.playerId.toString(),
            position: this.position,
            score: this.score,
            sobrante: this.sobrante ? this.sobrante.toPrimitives() : null,
            status: this.status.toString(),
            terna1: this.terna1.map(c => c.toPrimitives()),
            terna2: this.terna2.map(c => c.toPrimitives()),
            userId: this.userId.toString()

        };
    }
}