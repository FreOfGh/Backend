import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';
import {ExceptionMessagesConstants} from '../../../../../contexts/shared/domain/exception-messages.constants';

export class SearchGameByIdControllerRequest {
    @ApiProperty({required: true})
    @IsString({message: ExceptionMessagesConstants.GAME_ID_MUST_BE_STRING})
    @IsNotEmpty({message: ExceptionMessagesConstants.GAME_ID_REQUIRED})
        gameId: string;
}