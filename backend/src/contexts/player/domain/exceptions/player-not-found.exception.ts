import {Exception} from '../../../shared/domain/exception';
import {ExceptionMessagesConstants} from '../../../shared/domain/exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class PlayerNotFoundException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.PLAYER_NOT_FOUND_ERROR,
            HttpStatus.NOT_FOUND,
        );
    }
}