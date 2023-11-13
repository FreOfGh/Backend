import {IMatchRepository} from '../../domain/i-match.repository';
import {Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {MatchDocument} from './match-document';
import {Match} from '../../domain/match';
import {GameId} from '../../../game/domain/game-id';
import {MatchDto} from '../../domain/match.dto';
import {MatchStatusConstants} from '../../domain/match-status.constants';

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

    public async update(match: Match): Promise<Match> {
        this.logger.log(`[${this.update.name}] INIT :: Updating :: ${match.matchId.toString()}`);
        const {matchId, ...toUpdate}: MatchDto = match.toPrimitives();
        const updated: MatchDto = await this.model.findOneAndUpdate({matchId}, toUpdate, {new: true});
        const mapped: Match = updated ? Match.fromPrimitives(updated) : undefined;
        this.logger.log(`[${this.update.name}] FINISH ::`);
        return mapped;
    }

    async findActive(gameId: GameId): Promise<Match> {
        this.logger.log(`[${this.findActive.name}] INIT :: gameId: ${gameId.toString()}`);
        const found: MatchDto = await this.model.findOne({
            gameId: gameId.toString(),
            status: MatchStatusConstants.PLAYING
        });
        const mapped: Match = found ? Match.fromPrimitives(found) : undefined;
        this.logger.log(`[${this.findActive.name}] FINISH ::`);
        return mapped;
    }
}