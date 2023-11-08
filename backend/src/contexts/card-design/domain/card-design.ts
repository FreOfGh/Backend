import {CardDesignDto} from './card-design.dto';
import {CardDesignId} from './card-design-id';

export class CardDesign {

    private readonly cardDesignId: CardDesignId;
    public readonly name: string;
    private readonly isDefault: boolean;
    private readonly isActive: boolean;

    constructor(
        cardDesignId: CardDesignId,
        name: string,
        isDefault: boolean,
        isActive: boolean,
    ) {
        this.cardDesignId = cardDesignId;
        this.name = name;
        this.isDefault = isDefault;
        this.isActive = isActive;
    }

    static fromPrimitives(payload: CardDesignDto): CardDesign {
        return new CardDesign(
            new CardDesignId(payload.cardDesignId),
            payload.name,
            payload.isDefault,
            payload.isActive,
        );
    }

    toPrimitives(): CardDesignDto {
        return {
            cardDesignId: this.cardDesignId.toString(),
            name: this.name,
            isDefault: this.isDefault,
            isActive: this.isActive,
        };
    }
}