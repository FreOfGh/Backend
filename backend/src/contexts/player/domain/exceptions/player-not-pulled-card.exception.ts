import {Exception} from '../../../shared/domain/exception';
import {ExceptionMessagesConstants} from '../../../shared/domain/exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class PlayerNotPulledCardException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.PLAYER_NOT_PULLED_CARD,
            HttpStatus.BAD_REQUEST,
        );
    }
}