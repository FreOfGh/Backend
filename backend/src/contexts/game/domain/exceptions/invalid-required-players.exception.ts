import {Exception} from '../../../shared/domain/exception';
import {ExceptionMessagesConstants} from '../../../shared/domain/exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class InvalidRequiredPlayersException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.INVALID_REQUIRED_PLAYERS_ERROR,
            HttpStatus.BAD_REQUEST,
        );
    }
}