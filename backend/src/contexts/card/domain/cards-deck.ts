import {CardDto} from './card.dto';
import {CardTypeConstants} from './card-type.constants';
import {CardSymbolsConstants} from './card-symbols.constants';

const types: Array<string> = Object.values(CardTypeConstants);
const symbols: Array<string> = Object.values(CardSymbolsConstants);

export const DefaultCardsDeck: Array<CardDto> = types.flatMap((t) =>
    symbols.map((s): CardDto => {
        return {type: t, symbol: s};
    })
);

export const DefaultCardsDeck2 = [...DefaultCardsDeck, ...DefaultCardsDeck];