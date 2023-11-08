import {ICardDesignRepository} from '../../domain/i-card-design.repository';
import {Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {CardDesignDocument} from './card-design-document';
import {CardDesign} from '../../domain/card-design';
import {CardDesignDto} from '../../domain/card-design.dto';
import {CardDesignId} from '../../domain/card-design-id';

export class MongoCardDesignRepository implements ICardDesignRepository {

    private readonly logger: Logger = new Logger(MongoCardDesignRepository.name);

    constructor(private readonly model: Model<CardDesignDocument>) {
    }

    public async findActive(): Promise<Array<CardDesign>> {
        const found: Array<CardDesignDto> = await this.model.find({isActive: true});
        return found.map(CardDesign.fromPrimitives);
    }

    public async findById(cardDesignId: CardDesignId): Promise<CardDesign> {
        this.logger.log(`[${this.findById.name}] INIT :: cardDesignId: ${cardDesignId.toString()}`);
        const found: CardDesignDto = await this.model.findOne({cardDesignId: cardDesignId.toString()});
        const mapped: CardDesign = found ? CardDesign.fromPrimitives(found) : undefined;
        this.logger.log(`[${this.findById.name}] FINISH ::`);
        return mapped;
    }

    public async findDefault(): Promise<CardDesign> {
        const found: CardDesignDto = await this.model.findOne({isDefault: true, isActive: true});
        return found ? CardDesign.fromPrimitives(found) : undefined;
    }
}