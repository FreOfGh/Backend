import {Exception} from '../../../shared/domain/exception';
import {ExceptionMessagesConstants} from '../../../shared/domain/exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class MatchStatusNotValidException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.MATCH_STATUS_NOT_VALID_ERROR,
            HttpStatus.BAD_REQUEST,
        );
    }
}