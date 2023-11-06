import {StringValueObject} from '../../shared/domain/value-objects/string.value-object';
import {UserStatusConstants} from './user-status.constants';
import {UserStatusNotValidException} from './exceptions/user-status-not-valid.exception';

export class UserStatus extends StringValueObject {
    constructor(value: string) {
        UserStatus.validate(value);
        super(value);
    }

    private static validate(value: string): void {
        const isValid = (Object.values(UserStatusConstants) as string[]).includes(value);
        if (!isValid) throw new UserStatusNotValidException();
    }
}