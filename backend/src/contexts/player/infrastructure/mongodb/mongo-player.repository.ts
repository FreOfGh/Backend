import {IPlayerRepository} from '../../domain/i-player.repository';
import {Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {PlayerDocument} from './player-document';

export class MongoPlayerRepository implements IPlayerRepository {

    private readonly logger: Logger = new Logger(MongoPlayerRepository.name);

    constructor(private readonly model: Model<PlayerDocument>) {
    }
}