import {Exception} from '../../../shared/domain/exception';
import {ExceptionMessagesConstants} from '../../../shared/domain/exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class GameAlreadyStartedException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.GAME_HAS_ALREADY_STARTED,
            HttpStatus.BAD_REQUEST,
        );
    }
}