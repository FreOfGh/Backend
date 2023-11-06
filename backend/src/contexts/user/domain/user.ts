import {UserId} from './user-id';
import {UserStatus} from './user-status';
import {UserDto} from './user.dto';

export class User {
    private readonly userId: UserId;
    private readonly username: string;
    private readonly password: string;
    private readonly cardType: string;
    private readonly status: UserStatus;
    private readonly createdAt: Date;
    private readonly updatedAt: Date;

    constructor(
        userId: UserId,
        username: string,
        password: string,
        cardType: string,
        status: UserStatus,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.cardType = cardType;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static fromPrimitives(payload: UserDto): User {
        return new User(
            new UserId(payload.userId),
            payload.username,
            payload.password,
            payload.cardType,
            new UserStatus(payload.status),
            new Date(payload.createdAt),
            new Date(payload.updatedAt),
        );
    }

    public toPrimitives(): UserDto {
        return {
            cardType: this.cardType,
            createdAt: this.createdAt,
            password: this.password,
            status: this.status.toString(),
            updatedAt: this.updatedAt,
            userId: this.userId.toString(),
            username: this.username,
        };
    }
}