import {ApiProperty} from '@nestjs/swagger';

export class MatchDto {
    @ApiProperty() gameId: string;
    @ApiProperty() matchId: string;
    @ApiProperty() currentPosition: number;
    @ApiProperty() currentPlayers: number;
    @ApiProperty() turn: number;
    @ApiProperty() status: string;
}