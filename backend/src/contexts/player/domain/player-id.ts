import {IdValueObject} from '../../shared/domain/value-objects/id.value-object';

export class PlayerId extends IdValueObject {
    static create(): PlayerId {
        return new PlayerId(IdValueObject.generateId());
    }
}