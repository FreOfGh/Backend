import {Exception} from '../../../shared/domain/exception';
import {ExceptionMessagesConstants} from '../../../shared/domain/exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class NotEnoughTokensException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.NOT_ENOUGH_TOKENS_ERROR,
            HttpStatus.BAD_REQUEST,
        );
    }
}