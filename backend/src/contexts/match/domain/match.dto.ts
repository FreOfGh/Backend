import {ApiProperty} from '@nestjs/swagger';

export class MatchDto {
    @ApiProperty() gameId: string;
    @ApiProperty() matchId: string;
    @ApiProperty() currentPosition: number;
    @ApiProperty() status: string;
}