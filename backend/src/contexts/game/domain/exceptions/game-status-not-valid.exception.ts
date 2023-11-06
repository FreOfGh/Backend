import {Exception} from '../../../shared/domain/exception';
import {ExceptionMessagesConstants} from '../../../shared/domain/exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class GameStatusNotValidException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.GAME_STATUS_NOT_VALID_ERROR,
            HttpStatus.BAD_REQUEST,
        );
    }
}