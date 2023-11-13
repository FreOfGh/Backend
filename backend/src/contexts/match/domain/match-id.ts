import {IdValueObject} from '../../shared/domain/value-objects/id.value-object';

export class MatchId extends IdValueObject {
    static create(): MatchId {
        return new MatchId(IdValueObject.generateId());
    }
}