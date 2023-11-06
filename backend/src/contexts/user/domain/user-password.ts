import {PasswordNotValidException} from './exceptions/password-not-valid.exception';
import {StringValueObject} from '../../shared/domain/value-objects/string.value-object';
import * as crypto from 'crypto-js';

export class UserPassword extends StringValueObject {

    static validate(value: string): void {
        const regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!#$%&()*,\-./:;<>?^_{|}~¡¿])\S{8,}$/;
        if (!value.match(regexp)) throw new PasswordNotValidException();
    }

    static hash(value: string): string {
        return crypto.SHA256(value).toString();
    }

    public compare(value: string): boolean {
        return UserPassword.hash(value) == this.value;
    }
}