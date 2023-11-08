import {CardDesign} from './card-design';
import {CardDesignId} from './card-design-id';

export interface ICardDesignRepository {

    findActive(): Promise<Array<CardDesign>>;

    findById(cardDesignId: CardDesignId): Promise<CardDesign>;

    findDefault(): Promise<CardDesign>;
}