import {IMatchRepository} from '../../domain/i-match.repository';
import {Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {MatchDocument} from './match-document';

export class MongoMatchRepository implements IMatchRepository {

    private readonly logger: Logger = new Logger(MongoMatchRepository.name);

    constructor(private readonly model: Model<MatchDocument>) {
    }
}