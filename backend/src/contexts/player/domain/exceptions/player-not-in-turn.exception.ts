import {Exception} from '../../../shared/domain/exception';
import {ExceptionMessagesConstants} from '../../../shared/domain/exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class PlayerNotInTurnException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.PLAYER_NOT_IN_TURN,
            HttpStatus.BAD_REQUEST,
        );
    }
}