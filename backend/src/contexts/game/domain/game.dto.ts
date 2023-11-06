import {ApiProperty} from '@nestjs/swagger';

export class GameDto {
    @ApiProperty() gameId: string;
    @ApiProperty() requiredPlayers: number;
    @ApiProperty() name: string;
    @ApiProperty() isPublic: boolean;
    @ApiProperty() totalBet: number;
    @ApiProperty() totalPlayers: number;
    @ApiProperty() status: string;
    @ApiProperty() createdAt?: Date;
    @ApiProperty() updatedAt?: Date;
}