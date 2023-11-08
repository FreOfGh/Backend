import {CardDto} from './card.dto';

export class Card {

    private readonly type: string;
    private readonly symbol: string;

    constructor(type: string, symbol: string) {
        this.type = type;
        this.symbol = symbol;
    }

    public static fromPrimitives(payload: CardDto): Card {
        return new Card(
            payload.type,
            payload.symbol
        );
    }

    public toPrimitives(): CardDto {
        return {
            symbol: this.symbol,
            type: this.type,
        };
    }
}