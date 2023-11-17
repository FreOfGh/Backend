import {ApiProperty} from '@nestjs/swagger';
import {CardDto} from '../../card/domain/card.dto';

export class PlayerDto {
    @ApiProperty() playerId: string;
    @ApiProperty() gameId: string;
    @ApiProperty() userId: string;
    @ApiProperty() username: string;
    @ApiProperty() userIcon: string;
    @ApiProperty() userDesign: string;
    @ApiProperty() position: number;
    @ApiProperty() status: string;
    @ApiProperty() score: number;
    @ApiProperty({type: [CardDto]}) terna1: Array<CardDto>;
    @ApiProperty({type: [CardDto]}) terna2: Array<CardDto>;
    @ApiProperty({type: [CardDto]}) cuarta: Array<CardDto>;
    @ApiProperty({type: CardDto}) sobrante?: CardDto;
}