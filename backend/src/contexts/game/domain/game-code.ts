import {StringValueObject} from '../../shared/domain/value-objects/string.value-object';

export class GameCode extends StringValueObject {
    static create(): GameCode {
        const letters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let rawCode: string = '';
        for (let i: number = 0; i < 8; i++) {
            const index: number = Math.floor(Math.random() * letters.length);
            rawCode += letters.charAt(index);
        }
        return new GameCode(rawCode);
    }
}