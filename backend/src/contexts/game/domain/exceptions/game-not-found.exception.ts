import {Exception} from '../../../shared/domain/exception';
import {ExceptionMessagesConstants} from '../../../shared/domain/exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class GameNotFoundException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.GAME_NOT_FOUND_ERROR,
            HttpStatus.NOT_FOUND,
        );
    }
}