import {Exception} from '../../../shared/domain/exception';
import {ExceptionMessagesConstants} from '../../../shared/domain/exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class GameNotUpdatedException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.GAME_NOT_UPDATED_ERROR,
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}