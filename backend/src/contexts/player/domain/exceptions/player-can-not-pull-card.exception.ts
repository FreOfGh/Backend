import {Exception} from '../../../shared/domain/exception';
import {ExceptionMessagesConstants} from '../../../shared/domain/exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class PlayerCanNotPullCardException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.PLAYER_CAN_NOT_PULL_CARD,
            HttpStatus.BAD_REQUEST,
        );
    }
}