import {IGameRepository} from '../../domain/i-game.repository';
import {Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {GameDocument} from './game-document';
import {Game} from '../../domain/game';
import {GameDto} from '../../domain/game.dto';
import {GameStatusConstants} from '../../domain/game-status.constants';

export class MongoGameRepository implements IGameRepository {

    private readonly logger: Logger = new Logger(MongoGameRepository.name);

    constructor(private readonly model: Model<GameDocument>) {
    }

    public async create(game: Game): Promise<Game> {
        this.logger.log(`[${this.create.name}] INIT ::`);
        const model = new this.model(game.toPrimitives());
        await model.save();
        const mapped: Game = Game.fromPrimitives(model);
        this.logger.log(`[${this.create.name}] FINISH ::`);
        return mapped;
    }

    async findPublic(): Promise<Array<Game>> {
        const found: Array<GameDto> = await this.model.find({
            isPublic: true,
            status: GameStatusConstants.WAITING_PLAYERS
        });
        return found.map(Game.fromPrimitives);
    }
}