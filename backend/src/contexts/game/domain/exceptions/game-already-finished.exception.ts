import {Exception} from '../../../shared/domain/exception';
import {ExceptionMessagesConstants} from '../../../shared/domain/exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class GameAlreadyFinishedException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.GAME_HAS_ALREADY_FINISHED,
            HttpStatus.BAD_REQUEST,
        );
    }
}