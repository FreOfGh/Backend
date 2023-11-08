import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';
import {ExceptionMessagesConstants} from '../../../../../contexts/shared/domain/exception-messages.constants';

export class UpdateUserCardDesignControllerRequest {
    @ApiProperty({required: true})
    @IsString({message: ExceptionMessagesConstants.CARD_DESIGN_ID_MUST_BE_STRING})
    @IsNotEmpty({message: ExceptionMessagesConstants.CARD_DESIGN_ID_REQUIRED})
        cardDesignId: string;
}