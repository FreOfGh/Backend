import {StringValueObject} from '../../shared/domain/value-objects/string.value-object';
import {GameStatusConstants} from './game-status.constants';
import {GameStatusNotValidException} from './exceptions/game-status-not-valid.exception';

export class GameStatus extends StringValueObject {
    constructor(value: string) {
        GameStatus.validate(value);
        super(value);
    }

    private static validate(value: string): void {
        const isValid = (Object.values(GameStatusConstants) as string[]).includes(value);
        if (!isValid) throw new GameStatusNotValidException();
    }
}