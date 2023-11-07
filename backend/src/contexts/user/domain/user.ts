import {UserId} from './user-id';
import {UserStatus} from './user-status';
import {UserDto} from './user.dto';
import {UserPassword} from './user-password';

export class User {
    public readonly password: UserPassword;
    public readonly tokens: number;
    public readonly status: UserStatus;
    private readonly userId: UserId;
    private readonly username: string;
    private readonly cardType: string;
    private readonly createdAt?: Date;
    private readonly updatedAt?: Date;

    constructor(
        userId: UserId,
        username: string,
        password: UserPassword,
        cardType: string,
        status: UserStatus,
        tokens: number,
        createdAt?: Date,
        updatedAt?: Date,
    ) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.cardType = cardType;
        this.status = status;
        this.tokens = tokens;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static fromPrimitives(payload: UserDto): User {
        return new User(
            new UserId(payload.userId),
            payload.username,
            new UserPassword(payload.password),
            payload.cardType,
            new UserStatus(payload.status),
            payload.tokens,
            payload.createdAt ? new Date(payload.createdAt) : undefined,
            payload.updatedAt ? new Date(payload.updatedAt) : undefined,
        );
    }

    public toPrimitives(): UserDto {
        return {
            cardType: this.cardType,
            createdAt: this.createdAt,
            password: this.password.toString(),
            status: this.status.toString(),
            tokens: this.tokens,
            updatedAt: this.updatedAt,
            userId: this.userId.toString(),
            username: this.username,
        };
    }
}