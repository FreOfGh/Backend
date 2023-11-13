import {GameId} from './game-id';
import {GameStatus} from './game-status';
import {GameDto} from './game.dto';
import {UserId} from '../../user/domain/user-id';
import {GameCode} from './game-code';
import {GameStatusConstants} from './game-status.constants';

export class Game {

    public readonly gameId: GameId;
    public readonly requiredPlayers: number;
    public readonly totalBet: number;
    public totalPlayers: number;
    public currentPlayers: number;
    public status: GameStatus;
    private readonly creatorId: UserId;
    private readonly name: string;
    private readonly isPublic: boolean;
    private readonly code: GameCode;
    private readonly createdAt?: Date;
    private readonly updatedAt?: Date;

    constructor(
        gameId: GameId,
        creatorId: UserId,
        requiredPlayers: number,
        currentPlayers: number,
        name: string,
        isPublic: boolean,
        totalBet: number,
        totalPlayers: number,
        status: GameStatus,
        code: GameCode,
        createdAt?: Date,
        updatedAt?: Date,
    ) {
        this.gameId = gameId;
        this.creatorId = creatorId;
        this.requiredPlayers = requiredPlayers;
        this.currentPlayers = currentPlayers;
        this.name = name;
        this.isPublic = isPublic;
        this.totalBet = totalBet;
        this.totalPlayers = totalPlayers;
        this.status = status;
        this.code = code;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static fromPrimitives(payload: GameDto): Game {
        return new Game(
            new GameId(payload.gameId),
            new UserId(payload.creatorId),
            payload.requiredPlayers,
            payload.currentPlayers,
            payload.name,
            payload.isPublic,
            payload.totalBet,
            payload.totalPlayers,
            new GameStatus(payload.status),
            new GameCode(payload.code),
            payload.createdAt ? new Date(payload.createdAt) : undefined,
            payload.updatedAt ? new Date(payload.updatedAt) : undefined,
        );
    }

    public toPrimitives(): GameDto {
        return {
            code: this.code.toString(),
            createdAt: this.createdAt,
            creatorId: this.creatorId.toString(),
            currentPlayers: this.currentPlayers,
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

    public addPlayer(): void {
        if (this.status.toString() === GameStatusConstants.WAITING_PLAYERS &&
            this.requiredPlayers > this.totalPlayers
        ) {
            this.totalPlayers++;
            this.currentPlayers++;
        }
    }
}