import {IdValueObject} from '../../shared/domain/value-objects/id.value-object';

export class UserId extends IdValueObject {
    static create(): UserId {
        return new UserId(IdValueObject.generateId());
    }
}