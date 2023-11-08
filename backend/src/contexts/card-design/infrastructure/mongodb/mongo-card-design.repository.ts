import {ICardDesignRepository} from '../../domain/i-card-design.repository';
import {Logger} from '@nestjs/common';
import {Model} from 'mongoose';
import {CardDesignDocument} from './card-design-document';
import {CardDesign} from '../../domain/card-design';
import {CardDesignDto} from '../../domain/card-design.dto';

export class MongoCardDesignRepository implements ICardDesignRepository {

    private readonly logger: Logger = new Logger(MongoCardDesignRepository.name);

    constructor(private readonly model: Model<CardDesignDocument>) {
    }

    async findDefault(): Promise<CardDesign> {
        const found: CardDesignDto = await this.model.findOne({isDefault: true, isActive: true});
        return found ? CardDesign.fromPrimitives(found) : undefined;
    }
}