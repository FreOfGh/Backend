import {IdValueObject} from '../../shared/domain/value-objects/id.value-object';

export class GameId extends IdValueObject {
    static create(): GameId {
        return new GameId(IdValueObject.generateId());
    }
}