import {Exception} from '../exception';
import {ExceptionMessagesConstants} from '../exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class TryAgainLaterException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.TRY_AGAIN_LATER_ERROR,
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}