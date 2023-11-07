import {ApiProperty} from '@nestjs/swagger';
import {IsBoolean, IsNotEmpty, IsNumber, IsString, Max, Min} from 'class-validator';
import {ExceptionMessagesConstants} from '../../../../contexts/shared/domain/exception-messages.constants';

export class CreateGameControllerRequest {
    @ApiProperty({required: true})
    @Max(10, {message: ExceptionMessagesConstants.REQUIRED_PLAYERS_MUST_BE_IN_RANGE_ERROR})
    @Min(2, {message: ExceptionMessagesConstants.REQUIRED_PLAYERS_MUST_BE_IN_RANGE_ERROR})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0},
        {message: ExceptionMessagesConstants.REQUIRED_PLAYERS_MUST_BE_A_VALID_NUMBER_ERROR})
    @IsNotEmpty({message: ExceptionMessagesConstants.REQUIRED_PLAYERS_REQUIRED_ERROR})
        requiredPlayers: number;

    @ApiProperty({required: true})
    @IsBoolean({message: ExceptionMessagesConstants.IS_PUBLIC_MUST_BE_BOOLEAN})
    @IsNotEmpty({message: ExceptionMessagesConstants.IS_PUBLIC_REQUIRED})
        isPublic: boolean;

    @ApiProperty({required: true})
    @Min(1, {message: ExceptionMessagesConstants.TOTAL_BET_MUST_BE_GREATER_THAN_0})
    @IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0},
        {message: ExceptionMessagesConstants.TOTAL_BET_MUST_BE_A_VALID_NUMBER})
    @IsNotEmpty({message: ExceptionMessagesConstants.TOTAL_BET_REQUIRED})
        totalBet: number;

    @ApiProperty({required: true})
    @IsString({message: ExceptionMessagesConstants.NAME_MUST_BE_STRING})
    @IsNotEmpty({message: ExceptionMessagesConstants.NAME_REQUIRED})
        name: string;
}