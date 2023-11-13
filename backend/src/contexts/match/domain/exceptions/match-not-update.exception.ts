import {Exception} from '../../../shared/domain/exception';
import {ExceptionMessagesConstants} from '../../../shared/domain/exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class MatchNotUpdateException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.MATCH_NOT_UPDATED,
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}