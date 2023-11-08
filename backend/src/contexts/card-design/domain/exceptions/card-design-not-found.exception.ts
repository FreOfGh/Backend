import {Exception} from '../../../shared/domain/exception';
import {ExceptionMessagesConstants} from '../../../shared/domain/exception-messages.constants';
import {HttpStatus} from '@nestjs/common';

export class CardDesignNotFoundException extends Exception {
    constructor() {
        super(
            ExceptionMessagesConstants.CARD_DESIGN_NOT_FOUND_ERROR,
            HttpStatus.NOT_FOUND,
        );
    }
}