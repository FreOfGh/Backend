import {ICardDesignRepository} from '../../../domain/i-card-design.repository';
import {CardDesign} from '../../../domain/card-design';

export class SearchActiveCardDesignsApp {

    constructor(private readonly repository: ICardDesignRepository) {
    }

    exec(): Promise<Array<CardDesign>> {
        return this.repository.findActive();
    }
}