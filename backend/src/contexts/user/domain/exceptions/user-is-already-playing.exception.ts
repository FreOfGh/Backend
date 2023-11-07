import {Exception} from '../../../shared/domain/exception';
import {ExceptionMessagesConstants} from '../../../shared/domain/exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class UserIsAlreadyPlayingException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.USER_IS_ALREADY_PLAYING_ERROR,
            HttpStatus.BAD_REQUEST,
        );
    }
}