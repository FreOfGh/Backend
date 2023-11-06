import {StringValueObject} from './string.value-object';
import {v4 as uuid} from 'uuid';

export class IdValueObject extends StringValueObject {

    protected static generateId(): string {
        return uuid();
    }
}