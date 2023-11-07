import {GameId} from './game-id';
import {GameStatus} from './game-status';
import {GameDto} from './game.dto';
import {UserId} from '../../user/domain/user-id';

export class Game {

    private readonly gameId: GameId;
    private readonly creatorId: UserId;
    private readonly requiredPlayers: number;
    private readonly name: string;
    private readonly isPublic: boolean;
    private readonly totalBet: number;
    private readonly totalPlayers: number;
    private readonly status: GameStatus;
    private readonly createdAt?: Date;
    private readonly updatedAt?: Date;

    constructor(
        gameId: GameId,
        creatorId: UserId,
        requiredPlayers: number,
        name: string,
        isPublic: boolean,
        totalBet: number,
        totalPlayers: number,
        status: GameStatus,
        createdAt?: Date,
        updatedAt?: Date,
    ) {
        this.gameId = gameId;
        this.creatorId = creatorId;
        this.requiredPlayers = requiredPlayers;
        this.name = name;
        this.isPublic = isPublic;
        this.totalBet = totalBet;
        this.totalPlayers = totalPlayers;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static fromPrimitives(payload: GameDto): Game {
        return new Game(
            new GameId(payload.gameId),
            new UserId(payload.creatorId),
            payload.requiredPlayers,
            payload.name,
            payload.isPublic,
            payload.totalBet,
            payload.totalPlayers,
            new GameStatus(payload.status),
            payload.createdAt ? new Date(payload.createdAt) : undefined,
            payload.updatedAt ? new Date(payload.updatedAt) : undefined,
        );
    }

    public toPrimitives(): GameDto {
        return {
            createdAt: this.createdAt,
            creatorId: this.creatorId.toString(),
            gameId: this.gameId.toString(),
            isPublic: this.isPublic,
            name: this.name,
            requiredPlayers: this.requiredPlayers,
            status: this.status.toString(),
            totalBet: this.totalBet,
            totalPlayers: this.totalPlayers,
            updatedAt: this.updatedAt,
        };
    }
}