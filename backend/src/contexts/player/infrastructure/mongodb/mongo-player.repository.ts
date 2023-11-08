import {IPlayerRepository} from '../../domain/i-player.repository';
import {Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {PlayerDocument} from './player-document';
import {UserId} from '../../../user/domain/user-id';
import {Player} from '../../domain/player';
import {PlayerDto} from '../../domain/player.dto';

export class MongoPlayerRepository implements IPlayerRepository {

    private readonly logger: Logger = new Logger(MongoPlayerRepository.name);

    constructor(private readonly model: Model<PlayerDocument>) {
    }

    public async findByUserId(userId: UserId): Promise<Player> {
        this.logger.log(`[${this.findByUserId.name}] INIT :: userId: ${userId.toString()}`);
        const playerFound: PlayerDto = await this.model.findOne({userId: userId.toString()});
        const mapped: Player = playerFound ? Player.fromPrimitives(playerFound) : undefined;
        this.logger.log(`[${this.findByUserId.name}] FINISH ::`);
        return mapped;
    }

    public async create(player: Player): Promise<Player> {
        this.logger.log(`[${this.create.name}] INIT ::`);
        const model = new this.model(player.toPrimitives());
        await model.save();
        const mapped: Player = Player.fromPrimitives(model);
        this.logger.log(`[${this.create.name}] FINISH ::`);
        return mapped;
    }
}