import {StringValueObject} from '../../shared/domain/value-objects/string.value-object';
import {PlayerStatusConstants} from './player-status.constants';
import {PlayerStatusNotValidException} from './exceptions/player-status-not-valid.exception';

export class PlayerStatus extends StringValueObject {
    constructor(value: string) {
        PlayerStatus.validate(value);
        super(value);
    }

    private static validate(value: string): void {
        const isValid = (Object.values(PlayerStatusConstants) as string[]).includes(value);
        if (!isValid) throw new PlayerStatusNotValidException();
    }
}