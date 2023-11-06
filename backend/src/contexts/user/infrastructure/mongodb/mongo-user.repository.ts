import {IUserRepository} from '../../domain/i-user.repository';
import {Logger} from '@nestjs/common';
import {Model, Promise} from 'mongoose';
import {UserDocument} from './user-document';
import {User} from '../../domain/user';
import {UserDto} from '../../domain/user.dto';

export class MongoUserRepository implements IUserRepository {

    private readonly logger: Logger = new Logger(MongoUserRepository.name);

    constructor(private readonly model: Model<UserDocument>) {
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
}