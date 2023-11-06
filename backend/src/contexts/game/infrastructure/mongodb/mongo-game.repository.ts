import {IGameRepository} from '../../domain/i-game.repository';
import {Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {GameDocument} from './game-document';

export class MongoGameRepository implements IGameRepository {

    private readonly logger: Logger = new Logger(MongoGameRepository.name);

    constructor(private readonly model: Model<GameDocument>) {
    }
}