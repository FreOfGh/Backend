import {ApiProperty} from '@nestjs/swagger';
import {CardDto} from '../../card/domain/card.dto';

export class MatchDto {
    @ApiProperty() gameId: string;
    @ApiProperty() matchId: string;
    @ApiProperty() currentPlayers: number;
    @ApiProperty() turn: number;
    @ApiProperty() status: string;
    @ApiProperty({type: [CardDto]}) discardedCards: Array<CardDto>;
    @ApiProperty({type: CardDto}) cardsDeck: Array<CardDto>;
}