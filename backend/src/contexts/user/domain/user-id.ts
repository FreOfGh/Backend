import {IdValueObject} from '../../shared/domain/value-objects/id.value-object';

export class UserId extends IdValueObject {
    protected static create(): UserId {
        return new UserId(IdValueObject.generateId());
    }
}