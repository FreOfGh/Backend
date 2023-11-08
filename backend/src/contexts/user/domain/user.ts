import {UserId} from './user-id';
import {UserStatus} from './user-status';
import {UserDto} from './user.dto';
import {UserPassword} from './user-password';

export class User {
    public readonly password: UserPassword;
    public status: UserStatus;
    public readonly userId: UserId;
    private tokens: number;
    private readonly username: string;
    private readonly cardDesign: string;
    private readonly createdAt?: Date;
    private readonly updatedAt?: Date;

    constructor(
        userId: UserId,
        username: string,
        password: UserPassword,
        cardDesign: string,
        status: UserStatus,
        tokens: number,
        createdAt?: Date,
        updatedAt?: Date,
    ) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.cardDesign = cardDesign;
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
            payload.cardDesign,
            new UserStatus(payload.status),
            payload.tokens,
            payload.createdAt ? new Date(payload.createdAt) : undefined,
            payload.updatedAt ? new Date(payload.updatedAt) : undefined,
        );
    }

    public toPrimitives(): UserDto {
        return {
            cardDesign: this.cardDesign,
            createdAt: this.createdAt,
            password: this.password.toString(),
            status: this.status.toString(),
            tokens: this.tokens,
            updatedAt: this.updatedAt,
            userId: this.userId.toString(),
            username: this.username,
        };
    }

    public getTokens(): number {
        return this.tokens;
    }

    public removeTokens(value: number): void {
        if (value <= this.tokens) this.tokens = this.tokens - value;
    }
}