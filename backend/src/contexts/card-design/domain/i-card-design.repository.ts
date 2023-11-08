import {CardDesign} from './card-design';

export interface ICardDesignRepository {

    findDefault(): Promise<CardDesign>;
}