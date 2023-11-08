import {CardDesign} from '../../../domain/card-design';
import {ICardDesignRepository} from '../../../domain/i-card-design.repository';

export class SearchDefaultCardDesignApp {

    constructor(private readonly repository: ICardDesignRepository) {
    }

    exec(): Promise<CardDesign> {
        return this.repository.findDefault();
    }
}