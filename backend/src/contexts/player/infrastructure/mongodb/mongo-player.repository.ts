import {IPlayerRepository} from '../../domain/i-player.repository';
import {Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {PlayerDocument} from './player-document';
import {UserId} from '../../../user/domain/user-id';
import {Player} from '../../domain/player';
import {PlayerDto} from '../../domain/player.dto';
import {GameId} from '../../../game/domain/game-id';

export class MongoPlayerRepository implements IPlayerRepository {

    private readonly logger: Logger = new Logger(MongoPlayerRepository.name);

    constructor(private readonly model: Model<PlayerDocument>) {
    }

    public async findByGame(gameId: GameId): Promise<Array<Player>> {
        this.logger.log(`[${this.findByGame.name}] INIT :: gameId: ${gameId.toString()}`);
        const playersFound: Array<PlayerDto> = await this.model.find({gameId: gameId.toString()});
        const mapped: Array<Player> = playersFound.map(Player.fromPrimitives);
        this.logger.log(`[${this.findByGame.name}] FINISH ::`);
        return mapped;
    }

    public async findByUserId(userId: UserId): Promise<Player> {
        this.logger.log(`[${this.findByUserId.name}] INIT :: userId: ${userId.toString()}`);
        const playerFound: PlayerDto = await this.model.findOne({userId: userId.toString()});
        const mapped: Player = playerFound ? Player.fromPrimitives(playerFound) : undefined;
        this.logger.log(`[${this.findByUserId.name}] FINISH ::`);
        return mapped;
    }

    public async findByPosition(gameId: GameId, position: number): Promise<Player> {
        this.logger.log(`[${this.findByPosition.name}] INIT :: gameId: ${gameId.toString()}`);
        const playerFound: PlayerDto = await this.model.findOne({gameId: gameId.toString(), position});
        const mapped: Player = playerFound ? Player.fromPrimitives(playerFound) : undefined;
        this.logger.log(`[${this.findByPosition.name}] FINISH ::`);
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

    public async update(player: Player): Promise<Player> {
        this.logger.log(`[${this.update.name}] INIT :: Updating :: ${player.playerId.toString()}`);
        const {playerId, ...toUpdate}: PlayerDto = player.toPrimitives();
        const updated: PlayerDto = await this.model.findOneAndUpdate({playerId}, toUpdate, {new: true});
        const mapped: Player = updated ? Player.fromPrimitives(updated) : undefined;
        this.logger.log(`[${this.update.name}] FINISH ::`);
        return mapped;
    }
}