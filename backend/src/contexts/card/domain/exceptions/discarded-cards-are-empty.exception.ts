import {Exception} from '../../../shared/domain/exception';
import {ExceptionMessagesConstants} from '../../../shared/domain/exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class DiscardedCardsAreEmptyException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.DISCARDED_CARDS_ARE_EMPTY,
            HttpStatus.BAD_REQUEST,
        );
    }
}