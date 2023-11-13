import {IMatchRepository} from '../../domain/i-match.repository';
import {Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {MatchDocument} from './match-document';
import {Match} from '../../domain/match';

export class MongoMatchRepository implements IMatchRepository {

    private readonly logger: Logger = new Logger(MongoMatchRepository.name);

    constructor(private readonly model: Model<MatchDocument>) {
    }

    public async create(match: Match): Promise<Match> {
        this.logger.log(`[${this.create.name}] INIT ::`);
        const model = new this.model(match.toPrimitives());
        await model.save();
        const mapped: Match = Match.fromPrimitives(model);
        this.logger.log(`[${this.create.name}] FINISH ::`);
        return mapped;
    }
}