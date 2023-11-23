import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';
import {ExceptionMessagesConstants} from '../../../../contexts/shared/domain/exception-messages.constants';

export class LeaveGameControllerRequest {
    @ApiProperty({required: true})
    @IsString({message: ExceptionMessagesConstants.GAME_CODE_MUST_BE_STRING})
    @IsNotEmpty({message: ExceptionMessagesConstants.GAME_CODE_REQUIRED})
        gameCode: string;
}