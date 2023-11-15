import {CardDesignDto} from './card-design.dto';
import {CardDesignId} from './card-design-id';

export class CardDesign {

    public readonly name: string;
    public readonly title: string;
    private readonly cardDesignId: CardDesignId;
    private readonly isDefault: boolean;
    private readonly isActive: boolean;

    constructor(
        cardDesignId: CardDesignId,
        name: string,
        title: string,
        isDefault: boolean,
        isActive: boolean,
    ) {
        this.cardDesignId = cardDesignId;
        this.name = name;
        this.title = title;
        this.isDefault = isDefault;
        this.isActive = isActive;
    }

    static fromPrimitives(payload: CardDesignDto): CardDesign {
        return new CardDesign(
            new CardDesignId(payload.cardDesignId),
            payload.name,
            payload.title,
            payload.isDefault,
            payload.isActive,
        );
    }

    toPrimitives(): CardDesignDto {
        return {
            cardDesignId: this.cardDesignId.toString(),
            name: this.name,
            title: this.title,
            isDefault: this.isDefault,
            isActive: this.isActive,
        };
    }
}