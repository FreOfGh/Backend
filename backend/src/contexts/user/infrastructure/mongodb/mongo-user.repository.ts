import {UserRepository} from '../../domain/user.repository';
import {Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {UserDocument} from './user-document';

export class MongoUserRepository implements UserRepository {
    
    private readonly logger: Logger = new Logger(MongoUserRepository.name);

    constructor(private readonly model: Model<UserDocument>) {
    }
}