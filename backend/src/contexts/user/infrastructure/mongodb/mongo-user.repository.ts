import {IUserRepository} from '../../domain/i-user.repository';
import {Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {UserDocument} from './user-document';
import {User} from '../../domain/user';
import {UserDto} from '../../domain/user.dto';
import {UserId} from '../../domain/user-id';

export class MongoUserRepository implements IUserRepository {

    private readonly logger: Logger = new Logger(MongoUserRepository.name);

    constructor(private readonly model: Model<UserDocument>) {
    }

    public async findById(userId: UserId): Promise<User> {
        this.logger.log(`[${this.findById.name}] INIT :: userId: ${userId.toString()}`);
        const userFound: UserDto = await this.model.findOne({userId: userId.toString()});
        const mapped: User = userFound ? User.fromPrimitives(userFound) : undefined;
        this.logger.log(`[${this.findById.name}] FINISH ::`);
        return mapped;
    }

    public async findByUsername(username: string): Promise<User> {
        this.logger.log(`[${this.findByUsername.name}] INIT :: username: ${username}`);
        const userFound: UserDto = await this.model.findOne({username});
        const mapped: User = userFound ? User.fromPrimitives(userFound) : undefined;
        this.logger.log(`[${this.findByUsername.name}] FINISH ::`);
        return mapped;
    }

    public async create(user: User): Promise<User> {
        this.logger.log(`[${this.create.name}] INIT ::`);
        const model = new this.model(user.toPrimitives());
        await model.save();
        const mapped: User = User.fromPrimitives(model);
        this.logger.log(`[${this.create.name}] FINISH ::`);
        return mapped;
    }

    public async update(user: User): Promise<User> {
        this.logger.log(`[${this.update.name}] INIT :: Updating :: ${user.userId.toString()}`);
        const {userId, ...toUpdate}: UserDto = user.toPrimitives();
        const updated: UserDto = await this.model.findOneAndUpdate({userId}, toUpdate, {new: true});
        const mapped: User = updated ? User.fromPrimitives(updated) : undefined;
        this.logger.log(`[${this.update.name}] FINISH ::`);
        return mapped;
    }
}