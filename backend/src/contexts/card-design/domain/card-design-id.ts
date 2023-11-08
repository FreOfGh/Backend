import {IdValueObject} from '../../shared/domain/value-objects/id.value-object';

export class CardDesignId extends IdValueObject {
    static create(): CardDesignId {
        return new CardDesignId(IdValueObject.generateId());
    }
}