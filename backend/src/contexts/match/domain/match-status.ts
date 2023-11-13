import {StringValueObject} from '../../shared/domain/value-objects/string.value-object';
import {MatchStatusConstants} from './match-status.constants';
import {MatchStatusNotValidException} from './exceptions/match-status-not-valid.exception';

export class MatchStatus extends StringValueObject {
    constructor(value: string) {
        MatchStatus.validate(value);
        super(value);
    }

    private static validate(value: string): void {
        const isValid = (Object.values(MatchStatusConstants) as string[]).includes(value);
        if (!isValid) throw new MatchStatusNotValidException();
    }
}