import {ApiProperty} from '@nestjs/swagger';
import {CardDto} from '../../card/domain/card.dto';

export class PlayerDto {
    @ApiProperty() playerId: string;
    @ApiProperty() gameId: string;
    @ApiProperty() userId: string;
    @ApiProperty() position: number;
    @ApiProperty() status: string;
    @ApiProperty() score: number;
    @ApiProperty() terna1?: Array<CardDto>;
    @ApiProperty() terna2?: Array<CardDto>;
    @ApiProperty() cuarta?: Array<CardDto>;
    @ApiProperty() sobrante?: CardDto;
}